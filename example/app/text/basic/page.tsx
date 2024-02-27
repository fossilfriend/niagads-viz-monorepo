'use client'

import { ColoredText, AnnotatedText, Clob } from "@niagads-viz/Text"

const Page = () => {
    return (
        <>
            <h1>Custom Text Formatting</h1>
            <br />
            <ul>
                <li><ColoredText color="red" value="colored text" /></li>
                <li><AnnotatedText value={{ value: "annotated text", tooltip: "the AnnotatedText component associates a tooltip with a text block" }} /></li>
                <li>
                    <div style={{ width: "250px" }}>
                        <p><em>Large Text Block (Clob) with Show/Hide:</em></p>
                        <Clob value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." maxLength={200} />
                    </div>
                </li>
            </ul>
        </>
    )
}

export default Page;