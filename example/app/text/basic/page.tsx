'use client'

import { ColoredText, AnnotatedText } from "@niagads-viz/Text"

const Page = () => {
    return (
        <>
            <h1>Custom Text Formatting</h1>
            <br />
            <ul>
                <li><ColoredText color="red" value="colored text" /></li>
                <li><AnnotatedText value={{value: "annotated text", tooltip: "the AnnotatedText component associates a tooltip with a text block"}}/></li>
            </ul>
        </>
    )
}

export default Page;