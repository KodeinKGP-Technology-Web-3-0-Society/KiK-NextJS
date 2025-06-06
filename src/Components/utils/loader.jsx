'use client'

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(1,1,27)]">
        <div className="w-16 h-16 border-8 border-t-8 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
        </div>
    );
};

export default Loader;
