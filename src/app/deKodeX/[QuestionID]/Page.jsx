import React from "react";
import data from "../../../data/deKodeX/event-que.json";

async function page({params}) {
    const QuestionID = await params.QuestionID;
    const questionData = data.find(q => q.id === QuestionID);
    if (!questionData) {
        return <div>Question not found</div>;
    }

    return (
        <div >
            <div>
                <h1>{questionData.title}</h1>
            </div>
            <div>

            <p>{questionData.description}</p>
            <h3>Sample Input:</h3>
            <pre>{questionData.sampleInput}</pre>
            <h3>Sample Input Solution:</h3>
            <pre>{questionData.sampleInputSolution}</pre>
            <h3>Sample Output:</h3>
            <pre>{questionData.sampleOutput}</pre>
            <h3>Test Case:</h3>
            <pre>{questionData.testCase}</pre>
            <h3>Answer</h3>
            </div>

        </div>
    );
}
export default page;