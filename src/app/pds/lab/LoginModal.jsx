'use client'

import React, { useRef, useState } from 'react'

const LoginModal = ({ isVisible, onClose, onLogin }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const parentRef = useRef()

	const handleLogin = () => {
		onLogin(email, password)
	}

	const handleOutClick = e => {
		if (e.target === parentRef.current) {
			onClose()
		}
	}

	if (!isVisible) return null

	return (
		<div
			ref={parentRef}
			onClick={handleOutClick}
			className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center z-[100]"
		>
			<div className="relative bg-[#212121] text-white rounded-lg p-5 w-[90%] max-w-[400px] shadow-lg">
				<button
					onClick={onClose}
					className="absolute top-3 right-3 text-white text-2xl hover:text-red-400"
				>
					&times;
				</button>
				<h2 className="pb-4 text-2xl font-semibold">Login</h2>
				<form
					onSubmit={e => {
						e.preventDefault()
						handleLogin()
					}}
				>
					<div className="mb-4">
						<label htmlFor="email" className="block mb-1 text-sm">Email</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							className="w-full p-2 rounded bg-[#333] border-none focus:outline-none"
							required
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="password" className="block mb-1 text-sm">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							className="w-full p-2 rounded bg-[#333] border-none focus:outline-none"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	)
}

export default LoginModal
