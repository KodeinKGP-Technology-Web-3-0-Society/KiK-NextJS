import React from 'react';
import { useRef, useEffect } from 'react'
import Link from 'next/link';
import Robot from '../../data/animations/Robo.json'
import Lottie from 'lottie-react'
import WEBDEV from '../../data/animations/WEB.json'
import Blockchain from '../../data/animations/Blockchain.json'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import programmer from '../../../public/programmer-image.png'

gsap.registerPlugin(ScrollTrigger)

export default function Teams() {
	const cardRefs = useRef([])

	useEffect(() => {
		cardRefs.current.forEach((card, index) => {
			// eslint-disable-next-line no-undef
			if (typeof window !== 'undefined' && window.innerWidth > 768) {
				let xOffset = index === 0 ? '-30vw' : index === 1 ? '0vw' : '30vw'
				let angle = index === 0 ? -10 : index === 1 ? 0 : 10

				gsap
					.timeline({
						scrollTrigger: {
							trigger: card,
							start: '20% bottom',
							end: 'center center',
							scrub: true,
						},
					})
					.fromTo(
						card,
						{
							x: 0,
							rotation: angle,
							scale: 1,
						},
						{
							x: xOffset,
							rotation: 0,
							scale: 1.1,
						}
					)
			} else {
				var t3 = gsap.timeline({
					scrollTrigger: {
						trigger: card,
						start: 'top bottom',
						end: 'top center',
						scrub: true,
						scroller: 'body',
						immediateRender: true,
					},
				})

				t3.fromTo(
					card,
					{
						x: -300,
						opacity: 0,
					},
					{
						x: 0,
						opacity: 1,
						stagger: 0.2,
						ease: 'linear',
					}
				)
			}
		})

		var t4 = gsap.timeline({
			scrollTrigger: {
				trigger: '.pds-page-poster-wrapper',
				start: 'center bottom',
				end: 'center center',
				scrub: 1,
				scroller: 'body',
			},
		})

		t4.fromTo(
			'.pds-page-poster-wrapper',
			{
				x: -300,
				opacity: 0,
			},
			{
				x: 0,
				opacity: 1,
				duration: 0.5,
				stagger: 0.2,
			}
		)
	}, [])

	return (
		<div className="relative">
			<h2 id="recentHeader"
      className="my-8 text-center text-[48px] font-poppins text-transparent bg-gradient-to-br from-[#11E3FB] via-[#5BE6FF] to-[#11E3FB] bg-clip-text [background-clip:text] [-webkit-background-clip:text]">Our Expertise</h2>

			<div className="!mb-[20vw] md:relative md:h-[30vw] md:pb-[40vw] max-[768px]:relative max-[768px]:flex max-[768px]:flex-col max-[768px]:items-center max-[768px]:max-h-fit max-[768px]:mb-[5vh]">
				<div
					className="p-0 bg-[rgba(54,54,54,0.4)] rounded-[2.5vw] h-[40vw] transition-all duration-[1000ms] ease-[cubic-bezier(0.63,0.15,0.03,1.12)] mt-5 max-[768px]:w-[70vw] max-[768px]:h-[130vw] max-[768px]:relative max-[768px]:left-0 max-[768px]:top-0 max-[768px]:translate-x-0 max-[768px]:translate-y-0 max-[768px]:!mb-[20px] md:w-[20vw] md:absolute md:top-[10%] md:left-[40%] md:mb-[16px] md:z-[1] md:translate-x-[-50%] md:translate-y-[-50%] md:rotate-[5deg] md:transition md:delay-[100ms]"
					ref={el => (cardRefs.current[0] = el)}
				>
					<Lottie animationData={Robot} height={10}  />
					<p className="max-[768px]:text-[7vw] max-[768px]:mt-[5vw] !mt-[1.5vw] !mb-[0.5vw] !text-center font-montserrat text-2xl !bg-[linear-gradient(to_bottom_right,rgba(17,227,251,1),rgba(91,230,255,1),rgba(181,246,253,1),rgba(17,227,251,1))] bg-clip-text !text-transparent -webkit-bg-clip-text">AI & Metaverse</p>
					<p className="!px-5 !py-2.5 !text-center font-montserrat">
						Enter a realm where AI drives immersive Metaverse encounters,
						pushing boundaries of what&apos;s possible.
					</p>
				</div>
				<div
					className="p-0 bg-[rgba(54,54,54,0.4)] rounded-[2.5vw] h-[40vw] transition-all duration-[1000ms] ease-[cubic-bezier(0.63,0.15,0.03,1.12)] mt-5 max-[768px]:w-[70vw] max-[768px]:h-[130vw] max-[768px]:relative max-[768px]:left-0 max-[768px]:top-0 max-[768px]:translate-x-0 max-[768px]:translate-y-0 max-[768px]:!mb-[20px] md:w-[20vw] md:absolute md:top-[10%] md:left-[40%]  md:z-[2] md:translate-x-[-50%] md:translate-y-[-50%] md:rotate-[-7deg] md:transition md:delay-[50ms]"
					ref={el => (cardRefs.current[1] = el)}
				>
					<Lottie animationData={WEBDEV} height={10}/>
					<p className="max-[768px]:text-[7vw] max-[768px]:mt-[5vw] !mt-[1.5vw] !mb-[0.5vw] !text-center font-montserrat text-2xl !bg-[linear-gradient(to_bottom_right,rgba(17,227,251,1),rgba(91,230,255,1),rgba(181,246,253,1),rgba(17,227,251,1))] bg-clip-text !text-transparent -webkit-bg-clip-text">Web Development</p>
					<p className="!px-5 !py-2.5 !text-center font-montserrat">
						Crafting dynamic, responsive websites that deliver exceptional user
						experiences across all devices.
					</p>
				</div>
				<div
					className="p-0 bg-[rgba(54,54,54,0.4)] rounded-[2.5vw] h-[40vw] transition-all duration-[1000ms] ease-[cubic-bezier(0.63,0.15,0.03,1.12)] mt-5 max-[768px]:w-[70vw] max-[768px]:h-[130vw] max-[768px]:relative max-[768px]:left-0 max-[768px]:top-0 max-[768px]:translate-x-0 max-[768px]:translate-y-0 max-[768px]:mb-[20px] md:w-[20vw] md:absolute md:top-[10%] md:left-[40%] md:z-[3] md:translate-x-[-50%] md:translate-y-[-50%] md:rotate-[-2deg]"
					ref={el => (cardRefs.current[2] = el)}
				>
					<Lottie animationData={Blockchain} height={10} />
					<p className="max-[768px]:text-[7vw] max-[768px]:mt-[5vw] !mt-[1.5vw] !mb-[0.5vw] !text-center font-montserrat text-2xl !bg-[linear-gradient(to_bottom_right,rgba(17,227,251,1),rgba(91,230,255,1),rgba(181,246,253,1),rgba(17,227,251,1))] bg-clip-text !text-transparent -webkit-bg-clip-text">Blockchain</p>
					<p className="!px-5 !py-2.5 !text-center font-montserrat">
						Building the decentralized future with secure, transparent
						blockchain solutions and smart contracts.
					</p>
				</div>
			</div>

			<div className="w-[80%] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent my-5 mx-auto md:hidden"></div>

<div className="pds-page-poster-wrapper flex justify-center items-center mb-[50px] no-underline">
				<Link href="/pds" style={{ textDecoration: 'none' }}>
					<div className="pds-page-poster flex justify-center items-center w-[85vw] bg-[rgba(70,69,69,0.2)] rounded-[30px] no-underline max-md:flex-col max-md:w-[70vw] max-md:pt-[30px] max-md:pb-[30px] max-md:px-[10px] max-md:mt-[20px]">
						<div className="pds-page-poster-left w-[45vw] no-underline max-md:w-[70vw] max-md:px-[50px]">
							<h1 className='text-[3vw] py-[10px] bg-gradient-to-br from-[#11e3fb] via-[#5be6ff] to-[#11e3fb] text-transparent bg-clip-text no-underline font-montserrat max-md:text-[4vw] max-md:py-[10px] max-md:text-center'>Still Getting Stuck in PDS?</h1>
							<h2 className='text-[1.5vw] py-[10px] text-[aliceblue] font-montserrat max-md:py-[10px] max-md:text-[3vw] max-md:text-center'>Our curated PDS Problems set works right for you...</h2>
						</div>
						<div className="pds-page-poster-right flex justify-center items-center mb-[25px] ml-[10px] max-md:m-[20px]">
							<Image className="w-[35vw] max-md:w-[60vw]"src={programmer} alt="img" />
						</div>
					</div>
				</Link>
			</div>
		</div>
	)
}