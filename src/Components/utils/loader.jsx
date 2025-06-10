"use client";

const Loader = ({isSubmit}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(1,1,27)]">
      <div className={` ${isSubmit?"h-8 w-8":"h-16 w-16"} animate-spin rounded-full border-8 border-t-8 border-gray-200 border-t-blue-500`} />
    </div>
  );
};

export default Loader;
