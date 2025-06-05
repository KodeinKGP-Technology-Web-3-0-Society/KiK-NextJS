'use client'

import dynamic from 'next/dynamic';

// Dynamically import with SSR disabled
const Ribbon = dynamic(() => import('react-ribbons').then(mod => mod.Ribbon), {
    ssr: false,
});

export default function RibbonWrapper(props) {
    return (
        <Ribbon {...props}>
            {props.children}
        </Ribbon>
    );
}
