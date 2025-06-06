'use client'

import React, { useState } from 'react'
import dataJ from '../../../data/qna/lab-questions.json'
import Questions from './Questions'

export default function SubTopics({ topic, viewMode }) {
	const [openSubTopics, setOpenSubTopics] = useState([])

	const toggleSubTopic = sub => {
		setOpenSubTopics(prev =>
			prev.includes(sub) ? prev.filter(t => t !== sub) : [...prev, sub]
		)
	}

	return (
		<div className="w-full">
			{Object.keys(dataJ[topic][0]['Subtopics']).map((subTopic, index) => (
				<div
					key={index}
					className="w-full bg-[#01011b] rounded-lg mb-4 overflow-hidden"
				>
					<div
						className="text-xl sm:text-2xl font-semibold bg-[#43434390] text-white flex justify-between items-center cursor-pointer border-b border-cyan-300 px-5 py-4"
						onClick={() => toggleSubTopic(subTopic)}
					>
						{subTopic
							.replace(/([a-z])([A-Z0-9])|([A-Z])([0-9])/g, '$1$3 $2$4')
							.replace(/\bAnd\b/g, 'and')}
						<span className="text-2xl">{openSubTopics.includes(subTopic) ? '-' : '+'}</span>
					</div>

					{openSubTopics.includes(subTopic) && (
						<div className="bg-[#1c1a22] px-4 py-3">
							<Questions topic={topic} subTopic={subTopic} viewMode={viewMode} />
						</div>
					)}
				</div>
			))}
		</div>
	)
}
