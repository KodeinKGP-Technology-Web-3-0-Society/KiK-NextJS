'use client'

import { useEffect } from 'react'

export default function IonIcon({ name, size = 'large', className = '' }) {
	useEffect(() => {
		if (!customElements.get('ion-icon')) {
			const script = document.createElement('script')
			script.type = 'module'
			script.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js'
			document.head.appendChild(script)

			const noModuleScript = document.createElement('script')
			noModuleScript.noModule = true
			noModuleScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js'
			document.head.appendChild(noModuleScript)
		}
	}, [])

	return <ion-icon name={name} size={size} class={className}></ion-icon>
}