import './App.css';
import {useEffect, useRef, useState} from "react";
import {QUIZ_QUESTIONS} from "./quiz";

function QuizComponent(props) {
    const initialState = {quesIndex: 0, value: '', showTable: false};
    const initialTime = 20;
    const quesTimerInterval = useRef(null);
    const [quiz, setQuiz] = useState(JSON.parse(JSON.stringify(QUIZ_QUESTIONS)));
    const [state, setState] = useState(initialState);
    const [quesTimer, setQuesTimer] = useState(initialTime);

    useEffect(() => {
        handleQuesTimer();
        return () => {
            clearInterval(quesTimerInterval.current);
        }
    }, []);

    useEffect(() => {
        if (quesTimer === 0) {
            handleSkip();
        }
    }, [quesTimer]);

    const handleQuesTimer = () => {
        quesTimerInterval.current = setInterval(() => {
            setQuesTimer((prevQuesTimer) => prevQuesTimer - 1);
        }, 1000);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        quiz[state.quesIndex].submittedAns = state.value;
        handleQuiz();
    }

    const handleSkip = () => {
        quiz[state.quesIndex].submittedAns = "Not Answered";
        handleQuiz();
    }

    const handleQuiz = () => {
        clearInterval(quesTimerInterval.current);
        setQuiz([...quiz]);
        if (!!quiz[state.quesIndex + 1]) {
            setState({...state, quesIndex: state.quesIndex + 1, value: ''});
            setQuesTimer(initialTime);
            handleQuesTimer();
        } else {
            props.onQuizOver(quiz);
        }
    }

    return (
        <form className="quiz-form" onSubmit={handleOnSubmit}>
            <p>Time left to submit the answer: {quesTimer} Sec</p>
            <h1 className="quiz-question">{quiz[state.quesIndex].question}</h1>
            <br/>
            {quiz[state.quesIndex].options.map((opt, index) =>
                <div className="text-left" key={index + 1}>
                    <label>
                        <input type="radio" value={opt} name="options" required
                               checked={state.value === opt}
                               onChange={() => setState({...state, value: opt})}
                        />
                        &nbsp; {opt}
                    </label>
                    <br/><br/>
                </div>)}
            <br/><br/>
            <button className="btn" type="submit">Submit Answer</button>
            <button className="btn ml-10px" type="button" onClick={handleSkip}>Skip Question</button>
        </form>
    );
}

QuizComponent.defaultProps = {
    onQuizOver: () => {
    },
}

export default QuizComponent;
