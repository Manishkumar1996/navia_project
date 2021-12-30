import './App.css';
import {useState} from "react";
import QuizTable from "./QuizTable";
import QuizComponent from "./QuizComponent";

function App() {
    const [submittedQuestions, setSubmittedQuestions] = useState([]);
    return (
        <div className="App">
            <section className="App-header">
                {!submittedQuestions.length &&
                    <QuizComponent onQuizOver={(quiz) => setSubmittedQuestions(quiz)}/>}

                {!!submittedQuestions.length &&
                    <QuizTable quizQuestions={submittedQuestions}/>}
            </section>
        </div>
    );
}

export default App;
