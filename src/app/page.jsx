'use client'
import React, { useEffect, useState } from 'react'
import Landing from '@/Components/Landing/landing'
import Work from '@/Components/Landing/work'
import Loader from '@/Components/utils/loader'

const MainContent = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 450);

		return () => clearTimeout(timer);
	}, [])

	return (
		<div className="relative bg-[rgb(1,1,27)] flex flex-col h-full w-full overflow-hidden">
			{/* Content always rendered */}
			<Landing />
			<Work />

			{/* Loader overlay */}
			<div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgb(1,1,27)] transition-opacity duration-500 ease-in-out ${loading ? 'opacity-100 z-50' : 'opacity-0 pointer-events-none z-0'}`}>
				<Loader />
			</div>
		</div>
	)
}

const Home = () => {
	return (
		<div className="App">
			<MainContent />
		</div>
	)
}

export default Home
