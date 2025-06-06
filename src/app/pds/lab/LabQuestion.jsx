'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import dataJ from '../../../data/qna/programming-questions.json'

export default function LabQuestion() {
	const [flag, setFlag] = useState(false)
	const [copy, setCopy] = useState(false)
	const [question, setQuestion] = useState('')
	const [solution, setSolution] = useState('')

	const params = useParams()
	const topic = params?.topic
	const subTopic = params?.subTopic 
	const ind = parseInt(params?.ind)

	useEffect(() => {
		if (!topic || isNaN(ind)) return

		let arr = []
		if (topic === 'labTest') {
			const topicArray = [
				'initialBasics',
				'loops',
				'ArrayAndStrings',
				'functionsAndRecursions',
				'structuresAndPointers',
				'sortingAnd2dArrays',
				'linkedList',
			]
			topicArray.forEach(t => {
				arr = arr.concat(dataJ[t][2].Elements)
			})
		} else {
			arr = dataJ[topic]?.[0]?.Elements || []
		}

		if (arr[ind]) {
			setQuestion(arr[ind].Question)
			setSolution(arr[ind].Answer)
		}
	}, [topic, ind])

	const handleCopy = () => {
		navigator.clipboard.writeText(solution)
		setCopy(true)
		setTimeout(() => setCopy(false), 2000)
	}

	return (
		<div className="bg-[#01011b] p-5">
			<div className="bg-[#222] text-white p-5 my-5 mx-4 rounded-xl shadow-md font-black text-base">
				<pre className="overflow-x-auto whitespace-pre-wrap">{question}</pre>
			</div>

			<button
				onClick={() => setFlag(!flag)}
				className="bg-[#00a1d9] text-white px-5 py-2.5 rounded-md mx-2.5 my-2.5 hover:bg-[#007dab] cursor-pointer"
			>
				{flag ? 'Hide Solution' : 'Show Solution'}
			</button>

			{flag && (
				<div className="relative flex flex-col my-5 mx-5">
					<div className="bg-[#282a36] px-0 py-0">
						<button
							className="bg-[#3f3d3d] text-white px-4 py-1 text-base rounded-br-xl cursor-pointer"
							onClick={handleCopy}
						>
							{copy ? '✅ Copied!' : '📋 Copy Code'}
						</button>
					</div>
					<SyntaxHighlighter
						language="cpp"
						style={dracula}
						customStyle={{
							padding: '1.5rem',
							margin: '0rem',
							backgroundColor: '#282a36',
							// borderRadius: '10px',
						}}
						wrapLongLines={true}
					>
						{solution}
					</SyntaxHighlighter>
				</div>
			)}

			<a
				href="https://www.programiz.com/c-programming/online-compiler/"
				target="_blank"
				rel="noopener noreferrer"
				className="inline-block bg-[#00a1d9] text-white px-5 py-2.5 rounded-md mx-2.5 my-2.5 hover:bg-[#007dab] no-underline"
			>
				Open Online Editor
			</a>
		</div>
	)
}
