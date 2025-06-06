'use client'

import React, { useEffect, useState } from 'react'
import dataJ from '../../../data/qna/lab-questions.json'
import SubTopics from './SubTopics'
import LoginModal from './LoginModal'

export default function Lab() {
	const BACKEND_URL = 'https://kik-backend.onrender.com/'
	const [openTopics, setOpenTopics] = useState([])
	const [viewMode, setViewMode] = useState('All Questions')
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
    if (typeof window !== 'undefined') {
        setUser(localStorage.getItem('user'))
    }
    }, [])

	useEffect(() => {
		if (!localStorage.getItem('user')) {
			if (!localStorage.getItem('favourites')) {
				localStorage.setItem('favourites', JSON.stringify([]))
			}
		} else {
			const uid = localStorage.getItem('user')
			fetch(BACKEND_URL + 'status', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${uid}`,
				},
			}).then(resp => {
				if (resp.ok) {
					resp.json().then(data =>
						localStorage.setItem('favourites', JSON.stringify(data.favourites))
					)
				}
			})
		}
	}, [])

	useEffect(() => {
		if (!localStorage.getItem('user')) {
			if (!localStorage.getItem('completed')) {
				localStorage.setItem('completed', JSON.stringify([]))
			}
		} else {
			const uid = localStorage.getItem('user')
			fetch(BACKEND_URL + 'status', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${uid}`,
				},
			}).then(resp => {
				if (resp.ok) {
					resp.json().then(data =>
						localStorage.setItem('completed', JSON.stringify(data.completed))
					)
				}
			})
		}
	}, [])

	const toggleTopic = topic => {
		setOpenTopics(prev =>
			prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
		)
	}

	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

	const handleViewModeChange = mode => {
		setViewMode(mode)
		setIsDropdownOpen(false)
	}

	const openLoginBox = () => {
		if (localStorage.getItem('user')) {
			localStorage.removeItem('user')
		} else {
			setIsLoginOpen(true)
		}
	}

	const loginUser = (email, pswd) => {
		const favourites = JSON.parse(localStorage.getItem('favourites') || '[]')
		const complete = JSON.parse(localStorage.getItem('completed') || '[]')

		fetch(BACKEND_URL + 'makeUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, pswd, favourites, complete }),
		}).then(data => {
			if (data.ok) {
				setIsLoginOpen(false)
				data.json().then(txt => {
					localStorage.setItem('user', txt.user)
					localStorage.setItem('completed', JSON.stringify(txt.completed))
					localStorage.setItem('favourites', JSON.stringify(txt.favourites))
				})
			}
		})
	}

	return (
		<div className="flex flex-col items-center w-full px-4 bg-[#01011b] pb-4">
			<div className="text-center text-3xl text-cyan-300 !mt-5 !mb-5 font-bold">
				LAB PROBLEMS
			</div>

			<div className="w-full max-w-6xl flex flex-col sm:flex-row justify-between px-7 sm:px-0 sm:items-center !mb-4">
				<button
					className="bg-gray-800 text-white px-10 py-2 rounded-t border-b border-cyan-300 font-semibold hover:brightness-125 transition-all sm:w-[200px]"
					onClick={openLoginBox}
				>
					{user ? 'LogOut' : 'Login to Save'}
				</button>

				<div className="relative w-full sm:w-[200px] mt-2 sm:mt-0">
					<div
						className="bg-gray-900 text-white px-4 py-2 rounded-t border-b border-cyan-300 flex justify-between cursor-pointer font-semibold"
						onClick={toggleDropdown}
					>
						{viewMode}
						<span>{isDropdownOpen ? '▲' : '▼'}</span>
					</div>
					{isDropdownOpen && (
						<div className="absolute top-full left-0 w-full bg-[#193963] rounded-b z-10">
							{['All Questions', 'Favourite Questions', 'Incomplete Questions'].map(mode => (
								<div
									key={mode}
									onClick={() => handleViewModeChange(mode)}
									className="text-white px-4 py-2 hover:font-bold hover:bg-[#19396380] cursor-pointer bg-[#252531]"
								>
									{mode}
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<div className="flex flex-col items-center w-full max-w-6xl">
				{Object.keys(dataJ).map((topic, index) => (
					<div key={index} className="w-full bg-[#01011b] mb-3 rounded-lg overflow-hidden">
						<div
							className="text-white text-xl font-semibold px-5 py-4 bg-[#43434390] border-b border-cyan-300 flex justify-between items-center cursor-pointer"
							onClick={() => toggleTopic(topic)}
						>
							{topic
								.replace(/([a-z])([A-Z0-9])|([A-Z])([0-9])/g, '$1$3 $2$4')
								.replace(/\bAnd\b/g, 'and')}
							<span className="text-xl">{openTopics.includes(topic) ? '-' : '+'}</span>
						</div>
						{openTopics.includes(topic) && (
							<div className="bg-[#1c1a22] px-3 py-4 rounded-b-lg">
								<SubTopics topic={topic} viewMode={viewMode} />
							</div>
						)}
					</div>
				))}
			</div>

			<LoginModal
				isVisible={isLoginOpen}
				onClose={() => setIsLoginOpen(false)}
				onLogin={loginUser}
			/>
		</div>
	)
}
