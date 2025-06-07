'use client'
import { signOut } from 'firebase/auth';
import { auth } from '@/backend/firebase';
import { useRouter } from 'next/navigation';

const SignOutButton = () => {

    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("You have been successfully logged out.");
            router.push('/auth');
        } catch (error) {
            console.error("Logout error:", error);
            alert("An error occurred while logging out. Please try again.");
        }
    };

    return (
        <button onClick={handleLogout} className="cursor-pointer border-2 bg-red-200 text-red-600 mx-8">
            Sign Out
        </button>
    );
}
export default SignOutButton;