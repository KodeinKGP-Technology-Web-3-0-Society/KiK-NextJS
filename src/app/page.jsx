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
		}, 50);

		return () => clearTimeout(timer);
	}, [])

	return (
		<div className="bg-[rgb(1,1,27)] flex flex-col h-full w-full overflow-hidden">
			{
				loading 
				? 
					<Loader /> 
				: 
				<>
					<Landing />
					<Work />
				</>
			}
			
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
