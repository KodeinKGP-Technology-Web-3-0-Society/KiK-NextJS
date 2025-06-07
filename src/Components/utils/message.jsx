'use client'
import { X } from 'lucide-react';

const Message = ({ type, message, setShowMsg }) => {
    const messageStyles = {
        info: "bg-blue-100 text-blue-800",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800"
    };
    
    return (
        <div className={`flex items-center justify-center p-4 rounded-md ${messageStyles[type] || messageStyles.info}`}>
            <p>{message}</p>
            <div className="flex justify-end">
                <X onClick={() => setShowMsg(false)} size={24} />
            </div>
        </div>
    );
}

export default Message;