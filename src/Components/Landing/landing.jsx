'use client'

import { useEffect } from 'react'
import main from '../../data/animations/main.json'
import Lottie from 'lottie-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Landing = () => {
	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)

		var tl = gsap.timeline()

		tl.fromTo(
			'.navbar .logoo',
			{
				x: -30,
				opacity: 0,
			},
			{
				x: 0,
				opacity: 1,
				duration: 0.5,
				delay: 2,
				ease: 'power2.out',
			}
		)

		tl.fromTo(
			'.navbar .MainPartNavBar li',
			{
				y: -30,
				opacity: 0,
			},
			{
				y: 0,
				opacity: 1,
				duration: 0.5,
				delay: 2,
				stagger: 0.15,
				ease: 'power2.out',
			},
			'-=1.5'
		)

		tl.fromTo(
			'.right .Welcome',
			{
				x: -100,
				opacity: 0,
			},
			{
				x: 0,
				opacity: 1,
				duration: 0.5,
				delay: 1,
				ease: 'power2.out',
			},
			'-=1.5'
		)

		tl.fromTo(
			'.right span',
			{
				x: 0,
				opacity: 0,
			},
			{
				x: 100,
				opacity: 1,
				duration: 0.5,
				delay: 1,
				ease: 'power2.out',
			},
			'-=1.5'
		)

		tl.fromTo(
			'.right .vision',
			{
				x: -100,
				opacity: 0,
			},
			{
				x: 0,
				opacity: 1,
				duration: 0.5,
				delay: 1,
				ease: 'power2.out',
			},
			'-=1.5'
		)

		tl.fromTo(
			'.right .vision-depth',
			{
				x: -100,
				opacity: 0,
			},
			{
				x: 0,
				opacity: 1,
				duration: 0.5,
				delay: 1,
				ease: 'power2.out',
			},
			'-=1'
		)

		tl.fromTo(
			'.left',
			{
				opacity: 0,
			},
			{
				opacity: 1,
				duration: 1,
				delay: 1,
				ease: 'power2.out',
			},
			'-=1.2'
		)

		var t2 = gsap.timeline({
			scrollTrigger: {
				trigger: '.bottom-bar .text',
				start: 'top 90%',
				end: 'top 30%',
				scrub: 1,
				scroller: 'body',
			},
		})

		t2.fromTo(
			'.bottom-bar .text',
			{
				y: 30,
				opacity: 0,
			},
			{
				y: 0,
				opacity: 1,
				duration: 0.5,
				delay: 1,
				stagger: 0.2,
				ease: 'power2.out',
			}
		)

		var t3 = gsap.timeline({
			scrollTrigger: {
				trigger: '#recentHeader',
				start: 'top 90%',
				end: 'top 30%',
				scrub: 1,
				scroller: 'body',
			},
		})

		t3.fromTo(
			'#recentHeader',
			{
				x: -300,
				opacity: 0,
			},
			{
				x: 0,
				opacity: 1,
				duration: 0.5,
				stagger: 0.2,
				ease: 'power2.out',
			}
		)
	}, [])

	return (
		<div className="bg-[#01011b] flex flex-col h-full w-full overflow-hidden">
			<div className="flex flex-col md:flex-row justify-between p-5 md:pl-10">
				<div className="text-center md:text-left text-lg p-5 md:p-8 md:w-1/2">
					<h1 className="text-white text-[40px] font-semibold text-left lg:text-[50px] xl:text-[65px]">
						<div className="Welcome">Welcome to</div>
						<span className="text-[50px] lg:text-[60px] xl:text-[80px] font-extrabold bg-gradient-to-br from-[#11E3FB] via-[#5BE6FF] to-[#B5F6FD] bg-clip-text text-transparent text-center">
							KodeinKGP
						</span>
					</h1>
					<p className=" text-[#979898] font-poppins text-lg font-normal leading-loose pt-10 pb-10 text-left">
						“The Web as I envisaged it, we have not seen it yet. The future is
						still so much bigger than the past”
					</p>
					<p className=" text-white font-poppins text-lg font-normal leading-loose text-left">
						A student-run society that aims to spread awareness and educate
						students about the potential of Web 3.0 and future technologies. We
						host workshops and hackathons to give students hands-on experience
						with Blockchain Development and Artificial Intelligence.
						Additionally, we use our skills in web development and blockchain to
						work on real-world problems faced by the student community at IIT
						Kharagpur and beyond. By joining KodeinKGP, students can gain
						valuable technical skills and contribute to solving important
						problems while learning about one of the most exciting and
						rapidly-evolving technologies of our time.
					</p>
				</div>
				<div className="relative bottom-8 w-full md:w-1/2 mt-20 md:mt-0">
					<Lottie animationData={main} className="" />
				</div>
			</div>
			<div className="bottom-bar flex flex-col md:flex-row justify-between items-start text-left px-8 md:px-[60px] pb-[60px]">
				<div className="text text-white text-2xl font-semibold">
					260+ <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#11e3fb] via-[#5be6ff] to-[#11e3fb] text-xl">PDS Problems</span>
				</div>
				<div className="text text-white text-2xl font-semibold">
					17+ <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#11e3fb] via-[#5be6ff] to-[#11e3fb] text-xl">Articles</span>
				</div>
				<div className="text text-white text-2xl font-semibold">
					15+ <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#11e3fb] via-[#5be6ff] to-[#11e3fb] text-xl">Events</span>
				</div>
				<div className="text text-white text-2xl font-semibold">
					7000+ <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#11e3fb] via-[#5be6ff] to-[#11e3fb] text-xl">Community Members</span>
				</div>
			</div>
		</div>
	)
}

export default Landing
