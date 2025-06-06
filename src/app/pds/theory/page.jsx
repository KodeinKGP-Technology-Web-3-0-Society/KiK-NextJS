'use client'

import Link from 'next/link'

export default function Theory() {
	return (
		<div className="bg-[rgb(1,1,27)] font-sans">
			<h1 className="text-center text-[2rem] text-[#5be6ff] py-5 font-[500]">THEORY TOPICS</h1>

			<div className="flex flex-col sm:flex-row sm:flex-wrap justify-evenly items-center p-5 gap-5">
				{[
					{ id: 'initialBasics', name: 'Initial Basics', link: 'https://drive.google.com/file/d/1mcCy5NUCcITwl-UzIew_MTzGMILz3ux2/view?usp=sharing' },
					{ id: 'loops', name: 'Loops', link: 'https://drive.google.com/file/d/1Me41FYbSzZlJkm5KrJYbci5TRnMrxPGw/view?usp=sharing' },
					{ id: 'oneDArrays', name: '1D Arrays and Strings', link: 'https://drive.google.com/file/d/16MjuU4kc4NhuYv75RwGxw26x8GIXWsZy/view?usp=sharing' },
					{ id: 'functions', name: 'Functions and Recursions', link: 'https://drive.google.com/file/d/1ASeMcDy76F4dbjsibkxp40hM-dSTPJa2/view?usp=sharing' },
					{ id: 'pointers', name: 'Structures and Pointers', link: 'https://drive.google.com/file/d/15C3mjMMzMH-LIc3kULCD288yzgx4ht26/view?usp=sharing' },
				].map(({ id, name, link }) => (
					<a
						key={id}
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						className="no-underline text-xl font-semibold w-[80vw]"
					>
						<div className="bg-[#434343] border border-[#555] rounded-[10px] shadow-md text-white text-center p-5 transition-transform duration-200 hover:-translate-y-1.5">
							{name}
						</div>
					</a>
				))}

				<Link href="/pds/theory/theoryTest" className="no-underline text-xl font-semibold w-[80vw]">
					<div className="bg-[#434343] border border-[#555] rounded-[10px] shadow-md text-white text-center p-5 transition-transform duration-200 hover:-translate-y-1.5">
						Theory Tests [Combined]
					</div>
				</Link>
			</div>
		</div>
	)
}
