import React from "react";

function Page({params}) {
    return (
        <div >
            <h1>Question Page</h1>
            <h1>{params.QuestionID}</h1>

        </div>
    );
}
export default Page;