'use client'
import React, { useState } from 'react'
import Landing from '@/Components/Landing/landing'
import Work from '@/Components/Landing/work'
const MainContent = () => {

	return (
		<div className="bg-[rgb(1,1,27)] flex flex-col h-full w-full overflow-hidden">
			<Landing />
			<Work />
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
