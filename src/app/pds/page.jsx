'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import QuestionImg from './assets/question_mark.svg'

export default function LabTheory() {
	const [isExpanded, setIsExpanded] = useState(false)

	const handleToggle = () => {
		setIsExpanded(!isExpanded)
	}

	return (
		<div className="bg-[rgb(1,1,27)] min-h-screen flex items-center justify-center flex-col font-['Arial'] p-5">
			<div id="LabTheory" className="flex flex-col justify-center items-center p-5 w-full">
				{/* Question Image */}
				<div className="quesimg w-[90%] h-[300px] hidden lg:block mb-4">
					<div className="qimg w-[500px] h-full mx-auto overflow-hidden rounded-lg shadow-[rgba(0,0,0,0.15)_1.95px_1.95px_2.6px]">
						<Image
							src={QuestionImg}
							alt="Question mark"
							className="w-full h-full object-cover"
							width={500}
							height={300}
						/>
					</div>
				</div>

				<div className="LabTheoryContainer flex flex-col lg:flex-row justify-center items-center w-full">
					{/* Lab Problems */}
					<div
						id="labContainer"
						className="LabTheoryItems text-left border border-[#555] p-5 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-transform duration-200 m-4 flex-1 bg-gradient-to-br from-white from-[-278.56%] via-[#1d1b66] via-[5.67%] to-[#11101d] to-[91.61%] hover:-translate-y-1"
					>
						<h2 className="LabTheoryHeads text-[1.5rem] mb-2.5 font-bold text-[rgb(91,230,255)]">
							Lab Problems
						</h2>
						<div className="LabTheoryTexts text-[#ccc] my-[15px] leading-[1.125rem]">
							Welcome to our Lab Questions section, where you can embark on an exciting journey of hands-on learning. Immerse yourself in the world of programming and data structures through a wide array of exercises and challenges. Whether you're new to coding or an aspiring developer, our carefully curated collection of real-world problems and their solutions is your go-to resource. These exercises are designed to help you build a strong foundation, refine your practical skills, and gain the valuable experience necessary for success in your programming adventures.
						</div>
						<Link href="/pds/lab">
							<button className="LabTheoryBtns bg-[#0074d9] text-white border-none py-1.5 px-5 no-underline rounded font-bold mt-2.5 cursor-pointer hover:bg-[#0056b3]">
								See Problems
							</button>
						</Link>
					</div>

					{/* Theory Problems */}
					<div
						id="theoryContainer"
						className="LabTheoryItems text-left border border-[#555] p-5 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-transform duration-200 m-4 flex-1 bg-gradient-to-br from-white from-[-278.56%] via-[#24248b] via-[-78.47%] to-[#11101d] to-[91.61%] hover:-translate-y-1"
					>
						<h2 className="LabTheoryHeads text-[1.5rem] mb-2.5 font-bold text-[rgb(91,230,255)]">
							Theory Problems
						</h2>
						<div className="LabTheoryTexts text-[#ccc] my-[15px] leading-[1.125rem]">
							Step into the realm of theoretical knowledge with our Theory Questions section. Here, you can explore the fundamental principles that underpin programming and data structures. Dive into a diverse set of questions that cover the theoretical foundations of computer science and software engineering. While these resources are valuable for learners at any level, they are particularly beneficial for those who want to deepen their understanding of the theoretical aspects of these subjects.
						</div>
						<Link href="/pds/theory">
							<button className="LabTheoryBtns bg-[#0074d9] text-white border-none py-1.5 px-5 no-underline rounded font-bold mt-2.5 cursor-pointer hover:bg-[#0056b3]">
								See Problems
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
