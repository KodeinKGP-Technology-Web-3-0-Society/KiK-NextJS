import { useEffect, useState } from 'react'

function BubbleText() {
    const [text, setText] = useState("");
    const [idx, setIdx] = useState(0);
    const fullText = "Tech | Web 3.O";
    useEffect(() => {
        const timer = setInterval(() => {
            if (idx < fullText.length) {
                setText(prev => prev + fullText[idx]);
                setIdx(idx + 1);
            }
        }, 200)
        return () => clearInterval(timer);
    }, [idx]);
    return (
        <div className='text-lg text-white'>{text}
        </div>
    )
}

export default BubbleText