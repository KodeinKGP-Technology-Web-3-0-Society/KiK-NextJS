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
        <div className='flex flex-col gap-3 pb-8 mb-4'>
            <div className='text-lg text-white'>{text}</div>
            <p className='text-xs text-gray-400 max-w-md leading-relaxed mb-6'>
                "The Web as I envisaged it, we have not seen it yet. The future is still so much bigger than the past"
            </p>
        </div>
    )
}

export default BubbleText