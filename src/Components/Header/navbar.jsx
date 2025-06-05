'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Logo from '../../../public/KIK_logo-removebg.png'

function Navbar() {
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className={`sticky top-0 z-20 flex flex-wrap justify-between items-center px-2 bg-[rgba(1,1,27,0.6)] max-w-[99%] min-h-[5rem] ${isOpen ? 'flex-col h-screen bg-black w-full' : ''}`}>
			
			<div className={`flex flex-row items-center ml-[1.5vw] min-w-[20vw] ${isOpen ? 'hidden' : 'block'} md:flex`}>
				<div className="flex items-center gap-[5px] text-[1.2rem]">
					<Image src={Logo} alt="KodeinKGP Logo" className="w-[60px] h-[60px] p-[5px]" />
					<h4 className="text-white font-semibold">KodeinKGP</h4>
				</div>
			</div>

			<button
				id="hambutton"
				className={`md:hidden flex flex-col justify-between w-[50px] h-[25px] bg-none border-none cursor-pointer ${isOpen ? 'fixed left-[82vw] top-[15px]' : ''}`}
				onClick={toggleMenu}
			>
				<div className={`w-[30px] h-[3px] bg-[#eeeeee] transition-all duration-300 ease ${isOpen ? 'translate-x-[10px] translate-y-[18.2px] rotate-45 origin-center' : ''}`}></div>
				<div className={`w-[30px] h-[3px] bg-[#eeeeee] transition-all duration-300 ease ${isOpen ? 'opacity-0' : ''}`}></div>
				<div className={`w-[30px] h-[3px] bg-[#eeeeee] transition-all duration-300 ease ${isOpen ? 'translate-x-[10px] translate-y-[-2.2px] -rotate-45 origin-center' : ''}`}></div>
			</button>

			<div className={`min-w-[26vw] ml-auto ${isOpen ? 'flex justify-center items-center h-full w-full' : 'hidden'} md:block`}>

				<div className={`flex font-[Arial] ${isOpen ? 'flex-col' : 'flex-row'} items-center ${isOpen ? 'gap-4' : 'gap-[4rem]'}`}>
					
					<div className={`flex ${isOpen ? 'flex-col gap-4 items-start' : 'flex-row -mr-[20px]'}`}>
						
						<li className='cursor-pointer list-none' onClick={() => { if (isOpen) toggleMenu() }}>
							<span className="relative flex flex-col items-center group text-[1.2rem] mx-[25px]">
								<Link
									className="no-underline text-white transition-colors duration-300 pb-[15px] tracking-wide bg-gradient-to-br"
									href="/"
								>
									Home
								</Link>
								<span className="absolute bottom-3 left-0 h-[2px] w-full bg-[#11e3fb] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
							</span>
						</li>
						
						<li className='cursor-pointer list-none' onClick={() => { if (isOpen) toggleMenu() }}>
							<span className="relative flex flex-col items-center group text-[1.2rem] mx-[25px]">
								<Link
									className="no-underline text-white transition-colors duration-300 pb-[15px] tracking-wide bg-gradient-to-br"
									href="/pds"
								>
									PDS_Bank
								</Link>
								<span className="absolute bottom-3 left-0 h-[2px] w-full bg-[#11e3fb] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
							</span>
						</li>
						
						<li className='cursor-pointer list-none' onClick={() => { if (isOpen) toggleMenu() }}>
							<span className="relative flex flex-col items-center group text-[1.2rem] mx-[25px]">
								<Link
									className="no-underline text-white transition-colors duration-300 pb-[15px] tracking-wide bg-gradient-to-br"
									href="/articles"
								>
									Articles
								</Link>
								<span className="absolute bottom-3 left-0 h-[2px] w-full bg-[#11e3fb] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
							</span>
						</li>
						
						<li className='cursor-pointer list-none' onClick={() => { if (isOpen) toggleMenu() }}>
							<span className="relative flex flex-col items-center group text-[1.2rem] mx-[25px]">
								<Link
									className="no-underline text-white transition-colors duration-300 pb-[15px] tracking-wide bg-gradient-to-br"
									href="/teams"
								>
									Teams
								</Link>
								<span className="absolute bottom-3 left-0 h-[2px] w-full bg-[#11e3fb] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
							</span>
						</li>
						
						<li className='cursor-pointer list-none' onClick={() => { if (isOpen) toggleMenu() }}>
							<span className="relative flex flex-col items-center group text-[1.2rem] mx-[25px]">
								<Link
									className="no-underline text-white transition-colors duration-300 pb-[15px] tracking-wide bg-gradient-to-br"
									href="/events"
								>
									Events
								</Link>
								<span className="absolute bottom-3 left-0 h-[2px] w-full bg-[#11e3fb] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
							</span>
						</li>
						
						<li className='cursor-pointer list-none' onClick={() => { if (isOpen) toggleMenu() }}>
							<span className="relative flex flex-col items-center group text-[1.2rem] mx-[25px]">
								<Link
									className="no-underline text-white transition-colors duration-300 pb-[15px] tracking-wide bg-gradient-to-br"
									href="/regform"
								>
									Registration Form
								</Link>
								<span className="absolute bottom-3 left-0 h-[2px] w-full bg-[#11e3fb] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
							</span>
						</li>

					</div>

				</div>
			</div>
		</div>
	)
}

export default Navbar
