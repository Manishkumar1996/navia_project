function QuizTable(props) {
    return (
        <table>
            <thead>
            <tr>
                <th>No.</th>
                <th>Question</th>
                <th>Correct Ans</th>
                <th>Submitted Ans</th>
            </tr>
            </thead>
            <tbody>
            {props.quizQuestions.map((ques, index) =>
                <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{ques.question}</td>
                    <td>{ques.answer}</td>
                    <td>{ques.submittedAns}</td>
                </tr>)}
            </tbody>
        </table>
    );
}

QuizTable.defaultProps = {
    quizQuestions: [],
}

export default QuizTable;
