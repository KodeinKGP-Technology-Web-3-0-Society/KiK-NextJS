"use client";

import data from "../../data/events/EventsData.json";
import Image from "next/image";
import Link from "next/link";

// const page = () => {
//   return (
//     <div className="min-h-screen bg-[#01011b]">
//       <section className="hackathon_con"></section>

//       <section>
//         {data?.map((eventx, index) => (
//           <div className="mx-auto flex w-[95%] flex-col" key={index}>
//             {/* Event Container */}
//             <h2
//               className="mt-[32px] mb-6 ml-[5px] bg-clip-text font-[kanit] text-[48px] font-bold max-lg:ml-4 max-lg:text-[35px]"
//               style={{
//                 marginBottom: index === 0 || index === 5 ? "3.5rem" : "0",
//                 background: `radial-gradient(64.18% 64.18% at 71.16% 35.69%, 
//                             #def9fa 0.89%, #bef3f5 17.23%, #9dedf0 42.04%, 
//                             #7de7eb 55.12%, #5ce1e6 71.54%, #33bbcf 100%)`,
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//               }}
//             >
//               {index === 0
//                 ? "Previous Hackathons"
//                 : index === 5
//                   ? "Previous Workshops"
//                   : null}
//             </h2>

//             <div
//               className={`mr-0 flex gap-8 border-b-[2px] border-white pb-4 max-lg:m-0 max-lg:flex-col max-lg:gap-4 ${
//                 index % 2 === 0 ? "flex-row-reverse pr-12 max-lg:pr-0" : "mt-4"
//               }`}
//             >
//               {/* Event Image */}
//                <div className="relative max-h-[450px] w-[350%] max-lg:mx-auto max-lg:w-[88%]">
//                  <Image
//                   src={eventx.image}
//                   alt="event"
//                    fill
//                    className="rounded-[8px]"
//                    sizes="(max-width: 1024px) 100vw, 400px"
//                   priority={index < 2}
//                 />
//                </div>
//                <div className="event_content">
//                 <h3 className="mx-0 mt-2 mb-4 font-[kanit] text-[30px] text-white max-lg:text-[25px]">
//                   {eventx.heading}
//                 </h3>

//                 <div
//                   className={`text-base leading-[30.8px] font-normal text-[#ffffffb3] max-lg:text-[14px] ${
//                     index % 2 !== 0 ? "md:mr-20" : ""
//                   }`}
//                   dangerouslySetInnerHTML={{ __html: eventx.description }}
//                 />

//                 {Array.isArray(eventx.sponsor) && eventx.sponsor.length > 0 && (
//                   <div className="mt-4 flex items-center gap-[20px] max-lg:pr-2">
//                     <div className="font-poppins text-[20px] text-white">
//                       <h5>Sponsored by:</h5>
//                     </div>
//                     <div className="flex flex-wrap gap-[10px]">
//                       {eventx.sponsor.map((sponsor, i) => (
//                         <div key={i} className="flex items-center gap-1">
//                           <div className="relative h-[35px] w-[35px]">
//                             <Image
//                               src={eventx.sponsor_img[i]}
//                               alt={sponsor}
//                               fill
//                               className="rounded-full object-cover"
//                               sizes="35px"
//                             />
//                           </div>
//                           <h4 className="mx-[10px] my-0 text-white">
//                             {sponsor}
//                           </h4>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div> 
//             </div>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// };

// export default page;

// const page=()=>{
//   return(
//   <div className="min-h-screen bg-[#01011b]">

// <section>
//        {data?.map((eventx, index) => (
//           <div className="mx-auto flex w-[95%] flex-col" key={index}>
//             {/* Event Container */}
//             <h2
//               className="mt-[32px] mb-6 ml-[5px] bg-clip-text font-[kanit] text-[48px] font-bold max-lg:ml-4 max-lg:text-[35px]"
//               style={{
//                 marginBottom: index === 0 || index === 5 ? "3.5rem" : "0",
//                 background: `radial-gradient(64.18% 64.18% at 71.16% 35.69%, 
//                             #def9fa 0.89%, #bef3f5 17.23%, #9dedf0 42.04%, 
//                             #7de7eb 55.12%, #5ce1e6 71.54%, #33bbcf 100%)`,
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//               }}
//             >
//               {index === 0
//                 ? (<>"Previous Hackathons"<img
//                 src="https://i0.wp.com/www.sciencenews.org/wp-content/uploads/2023/04/040823_chatgpt_feat.gif?fit=1024%2C576&ssl=1"
//                 className="w-[200px] h-[120px] ml-2 rounded-full inline-block align-middle ml-[20px]"
//                  />
//               </>): index === 5
//                   ? (<>
//                     "Previous Workshops"
//                     <img
//                 src="https://i.pinimg.com/originals/bb/0c/c7/bb0cc783196fa9b2119864ff90eb5702.gif"
//                 className="w-[200px] h-[120px] ml-2 rounded-full inline-block align-middle ml-[20px]"
//                  />
//                   </>)
//                   : null}
//             </h2>




//             <div
//               // className={`mr-[5vw] ml-[5vw] flex flex-col gap-8  pb-4 max-lg:m-0 max-lg:flex-col max-lg:gap-4 ${
//               //   index % 2 === 1 ? "flex-row-reverse flex-col pr-12 max-lg:pr-0" : "mt-4"
//               // }`}
//               className={`mr-[5vw] ml-[5vw] flex gap-8 pb-4 max-lg:m-0 max-lg:flex-col max-lg:gap-4 ${
//   index % 2 === 1 
//     ? "flex-col items-end pr-12 max-lg:pr-0" 
//     : "flex-col mt-4"
// }`}
//             >
//               <Link href="/" className="no-underline border-b-2 border-[#87CEEB] pb-4">
         
//               {/* Event Image */}
//                <div className="relative h-[200px] w-[350px] max-lg:mx-auto max-lg:w-[88%]">
//                  <Image
//                   src={eventx.image}
//                   alt="event"
//                    fill
//                    className="rounded-[8px]"
//                    sizes="(max-width: 1024px) 100vw, 400px"
//                   priority={index < 2}
//                 />
//                </div>
//                <div className="event_content">
//                 <h3 className="mx-0 mt-2 mb-4 font-[kanit] text-[30px] text-white max-lg:text-[25px]">
//                   {eventx.heading}
//                 </h3>

//                 {/* <div
//                   className={`text-base leading-[30.8px] font-normal text-[#ffffffb3] max-lg:text-[14px] ${
//                     index % 2 !== 0 ? "md:mr-20" : ""
//                   }`}
//                   dangerouslySetInnerHTML={{ __html: eventx.description }}
//                 /> */}

//                 {Array.isArray(eventx.sponsor) && eventx.sponsor.length > 0 && (
//                   <div className="mt-4 flex items-center gap-[20px] max-lg:pr-2">
//                     <div className="font-poppins text-[20px] text-white">
//                       <h5>Sponsored by:</h5>
//                     </div>
//                     <div className="flex flex-wrap gap-[10px]">
//                       {eventx.sponsor.map((sponsor, i) => (
//                         <div key={i} className="flex items-center gap-1">
//                           <div className="relative h-[35px] w-[35px]">
//                             <Image
//                               src={eventx.sponsor_img[i]}
//                               alt={sponsor}
//                               fill
//                               className="rounded-full object-cover"
//                               sizes="35px"
//                             />
//                           </div>
//                           <h4 className="mx-[10px] my-0 text-white">
//                             {sponsor}
//                           </h4>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div> 
//                </Link>
//             </div>
           
//           </div>
//         ))}
//       </section>

//   </div>
//   );

// };


// export default page;


// const page = () => {
//   return (
//     <div className="min-h-screen bg-[#01011b]">
//       <section>
//         {data?.map((eventx, index) => (
//           <div className="mx-auto flex w-[95%] flex-col relative" key={index}>
//             {/* Event Container */}
//             <h2
//               className="mt-[32px] mb-6 ml-[5px] bg-clip-text font-[kanit] text-[48px] font-bold max-lg:ml-4 max-lg:text-[35px]"
//               style={{
//                 marginBottom: index === 0 || index === 5 ? "3.5rem" : "0",
//                 background: `radial-gradient(64.18% 64.18% at 71.16% 35.69%, 
//                             #def9fa 0.89%, #bef3f5 17.23%, #9dedf0 42.04%, 
//                             #7de7eb 55.12%, #5ce1e6 71.54%, #33bbcf 100%)`,
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//               }}
//             >
//               {index === 0 ? (
//                 <>
//                   "Previous Hackathons"
//                   <img
//                     src="https://i0.wp.com/www.sciencenews.org/wp-content/uploads/2023/04/040823_chatgpt_feat.gif?fit=1024%2C576&ssl=1"
//                     className="w-[200px] h-[120px] ml-2 rounded-full inline-block align-middle ml-[20px]"
//                   />
//                 </>
//               ) : index === 5 ? (
//                 <>
//                   "Previous Workshops"
//                   <img
//                     src="https://i.pinimg.com/originals/bb/0c/c7/bb0cc783196fa9b2119864ff90eb5702.gif"
//                     className="w-[200px] h-[120px] ml-2 rounded-full inline-block align-middle ml-[20px]"
//                   />
//                 </>
//               ) : null}
//             </h2>

//             {/* Timeline Container */}
//             <div className="relative max-lg:block">
//               {/* Event Card */}
//               <div
//                 className={`relative w-full mb-16 max-lg:mb-8 ${
//                   index % 2 === 0 
//                     ? "max-w-[500px] mr-auto max-lg:max-w-none" 
//                     : "max-w-[500px] ml-auto max-lg:max-w-none"
//                 }`}
//               >
//                 {/* Curved Arrow connecting to next image - Only on desktop and not for last item */}
//                 {index < data.length - 1 && (
//                   <div className="absolute w-full h-20 top-full left-0 max-lg:hidden">
//                     <svg
//                       className="w-full h-full"
//                       viewBox="0 0 500 80"
//                       fill="none"
//                       preserveAspectRatio="none"
//                     >
//                       {index % 2 === 0 ? (
//                         // From left to right - S-curve
//                         <>
//                           <path
//                             d="M100 10 Q200 20, 300 40 Q400 60, 450 50"
//                             stroke="#87CEEB"
//                             strokeWidth="3"
//                             fill="none"
//                             strokeLinecap="round"
//                           />
//                           {/* Arrow head */}
//                           <path
//                             d="M440 45 L450 50 L445 55 M450 50 L440 52"
//                             stroke="#87CEEB"
//                             strokeWidth="3"
//                             fill="none"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                         </>
//                       ) : (
//                         // From right to left - S-curve
//                         <>
//                           <path
//                             d="M400 10 Q300 20, 200 40 Q100 60, 50 50"
//                             stroke="#87CEEB"
//                             strokeWidth="3"
//                             fill="none"
//                             strokeLinecap="round"
//                           />
//                           {/* Arrow head */}
//                           <path
//                             d="M60 45 L50 50 L55 55 M50 50 L60 52"
//                             stroke="#87CEEB"
//                             strokeWidth="3"
//                             fill="none"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                         </>
//                       )}
//                     </svg>
//                   </div>
//                 )}

//                 {/* Event Card with Border */}
//                 <Link href="/" className="no-underline block">
//                   <div className="border-2 border-[#87CEEB] rounded-[12px] p-4 max-lg:p-6 bg-gradient-to-br from-[#0a0a2e] to-[#01011b] hover:border-[#33bbcf] transition-all duration-300 hover:shadow-lg hover:shadow-[#87CEEB]/20">
//                     {/* Event Image */}
//                     <div className="relative h-[200px] w-full mb-4 max-lg:h-[180px]">
//                       <Image
//                         src={eventx.image}
//                         alt="event"
//                         fill
//                         className="rounded-[8px] object-cover"
//                         sizes="(max-width: 1024px) 100vw, 400px"
//                         priority={index < 2}
//                       />
//                     </div>

//                     {/* Event Content */}
//                     <div className="event_content">
//                       <h3 className="mx-0 mt-2 mb-4 font-[kanit] text-[30px] text-white max-lg:text-[24px] max-sm:text-[22px]">
//                         {eventx.heading}
//                       </h3>

//                       {/* Sponsors Section */}
//                       {Array.isArray(eventx.sponsor) && eventx.sponsor.length > 0 && (
//                         <div className="mt-4 flex items-start gap-[20px] max-lg:flex-col max-lg:gap-3">
//                           <div className="font-poppins text-[20px] text-white max-lg:text-[18px] flex-shrink-0">
//                             <h5 className="m-0">Sponsored by:</h5>
//                           </div>
//                           <div className="flex flex-wrap gap-[10px] max-lg:gap-2">
//                             {eventx.sponsor.map((sponsor, i) => (
//                               <div key={i} className="flex items-center gap-1 max-lg:gap-2">
//                                 <div className="relative h-[35px] w-[35px] max-lg:h-[30px] max-lg:w-[30px] flex-shrink-0">
//                                   <Image
//                                     src={eventx.sponsor_img[i]}
//                                     alt={sponsor}
//                                     fill
//                                     className="rounded-full object-cover"
//                                     sizes="35px"
//                                   />
//                                 </div>
//                                 <h4 className="my-0 text-white text-[16px] max-lg:text-[14px] font-normal">
//                                   {sponsor}
//                                 </h4>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// };

// export default page;





// const page = () => {
//   return (
//     <div className="min-h-screen bg-[#01011b]">
//       <section>
//         {data?.map((eventx, index) => (
//           <div className="mx-auto flex w-[95%] flex-col relative" key={index}>
//             {/* Event Container */}
//             <h2
//               className="mt-[32px] mb-6 ml-[5px] bg-clip-text font-[kanit] text-[48px] font-bold max-lg:ml-4 max-lg:text-[35px]"
//               style={{
//                 marginBottom: index === 0 || index === 5 ? "3.5rem" : "0",
//                 background: `radial-gradient(64.18% 64.18% at 71.16% 35.69%, 
//                             #def9fa 0.89%, #bef3f5 17.23%, #9dedf0 42.04%, 
//                             #7de7eb 55.12%, #5ce1e6 71.54%, #33bbcf 100%)`,
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//               }}
//             >
//               {index === 0 ? (
//                 <>
//                   "Previous Hackathons"
//                   <img
//                     src="https://i0.wp.com/www.sciencenews.org/wp-content/uploads/2023/04/040823_chatgpt_feat.gif?fit=1024%2C576&ssl=1"
//                     className="w-[200px] h-[120px] ml-2 rounded-full inline-block align-middle ml-[20px]"
//                   />
//                 </>
//               ) : index === 5 ? (
//                 <>
//                   "Previous Workshops"
//                   <img
//                     src="https://i.pinimg.com/originals/bb/0c/c7/bb0cc783196fa9b2119864ff90eb5702.gif"
//                     className="w-[200px] h-[120px] ml-2 rounded-full inline-block align-middle ml-[20px]"
//                   />
//                 </>
//               ) : null}
//             </h2>

//             {/* Timeline Container */}
//             <div className="relative flex justify-center">
//               {/* Timeline Line */}
//               <div className="absolute left-1/2 transform -translate-x-1/2 w-[4px] bg-gradient-to-b from-[#87CEEB] to-[#33bbcf] h-full z-0"></div>

//               {/* Event Card */}
//               <div
//                 className={`relative w-full max-w-[500px] mb-12 ${
//                   index % 2 === 0 
//                     ? "mr-auto pr-8 max-lg:pr-4" 
//                     : "ml-auto pl-8 max-lg:pl-4"
//                 }`}
//               >
//                 {/* Arrow pointing to timeline */}
//                 <div
//                   className={`absolute top-1/2 transform -translate-y-1/2 w-0 h-0 z-10 ${
//                     index % 2 === 0
//                       ? "right-[-12px] border-l-[20px] border-l-[#87CEEB] border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent"
//                       : "left-[-12px] border-r-[20px] border-r-[#87CEEB] border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent"
//                   }`}
//                 ></div>

//                 {/* Timeline Dot */}
//                 <div
//                   className={`absolute top-1/2 transform -translate-y-1/2 w-[16px] h-[16px] bg-[#87CEEB] rounded-full border-4 border-[#01011b] z-20 ${
//                     index % 2 === 0 ? "right-[-32px]" : "left-[-32px]"
//                   }`}
//                 ></div>

//                 {/* Event Card with Border */}
//                 <Link href="/" className="no-underline">
//                   <div className="border-2 border-[#87CEEB] rounded-[12px] p-6 bg-gradient-to-br from-[#0a0a2e] to-[#01011b] hover:border-[#33bbcf] transition-all duration-300 hover:shadow-lg hover:shadow-[#87CEEB]/20">
//                     {/* Event Image */}
//                     <div className="relative h-[200px] w-full mb-4">
//                       <Image
//                         src={eventx.image}
//                         alt="event"
//                         fill
//                         className="rounded-[8px] object-cover"
//                         sizes="(max-width: 1024px) 100vw, 400px"
//                         priority={index < 2}
//                       />
//                     </div>

//                     {/* Event Content */}
//                     <div className="event_content">
//                       <h3 className="mx-0 mt-2 mb-4 font-[kanit] text-[30px] text-white max-lg:text-[25px]">
//                         {eventx.heading}
//                       </h3>

//                       {/* Sponsors Section */}
//                       {Array.isArray(eventx.sponsor) && eventx.sponsor.length > 0 && (
//                         <div className="mt-4 flex items-center gap-[20px] max-lg:flex-col max-lg:items-start max-lg:gap-2">
//                           <div className="font-poppins text-[20px] text-white">
//                             <h5>Sponsored by:</h5>
//                           </div>
//                           <div className="flex flex-wrap gap-[10px]">
//                             {eventx.sponsor.map((sponsor, i) => (
//                               <div key={i} className="flex items-center gap-1">
//                                 <div className="relative h-[35px] w-[35px]">
//                                   <Image
//                                     src={eventx.sponsor_img[i]}
//                                     alt={sponsor}
//                                     fill
//                                     className="rounded-full object-cover"
//                                     sizes="35px"
//                                   />
//                                 </div>
//                                 <h4 className="mx-[10px] my-0 text-white text-[16px]">
//                                   {sponsor}
//                                 </h4>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// };

// export default page;

const page = () => {
  return (
    <div className="min-h-screen bg-[#01011b] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#33bbcf]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-[#87CEEB]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#def9fa]/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <section className="relative z-10">
        {data?.map((eventx, index) => (
          <div className="mx-auto flex w-[95%] flex-col relative" key={index}>
            {/* Event Container */}
            <h2
              className="mt-[32px] mb-6 ml-[5px] bg-clip-text font-[kanit] text-[48px] font-bold max-lg:ml-4 max-lg:text-[35px] text-center animate-fadeInUp"
              style={{
                marginBottom: index === 0 || index === 5 ? "3.5rem" : "0",
                background: `radial-gradient(64.18% 64.18% at 71.16% 35.69%, 
                            #def9fa 0.89%, #bef3f5 17.23%, #9dedf0 42.04%, 
                            #7de7eb 55.12%, #5ce1e6 71.54%, #33bbcf 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 20px rgba(135, 206, 235, 0.3))",
              }}
            >
              {index === 0 ? (
                <div className="flex items-center justify-center gap-5 max-lg:flex-col">
                  Previous Hackathons
                  <img
                    src="https://i0.wp.com/www.sciencenews.org/wp-content/uploads/2023/04/040823_chatgpt_feat.gif?fit=1024%2C576&ssl=1"
                    className="w-[200px] h-[120px] rounded-full border-4 border-[#87CEEB]/50 shadow-lg shadow-[#87CEEB]/30 hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ) : index === 5 ? (
                <div className="flex items-center justify-center gap-5 max-lg:flex-col">
                  Previous Workshops
                  <img
                    src="https://i.pinimg.com/originals/bb/0c/c7/bb0cc783196fa9b2119864ff90eb5702.gif"
                    className="w-[200px] h-[120px] rounded-full border-4 border-[#87CEEB]/50 shadow-lg shadow-[#87CEEB]/30 hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ) : null}
            </h2>

            {/* Timeline Container */}
            <div className="relative flex justify-center">
              {/* Enhanced Timeline Line with glow effect */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-[6px] bg-gradient-to-b from-[#87CEEB] via-[#5ce1e6] to-[#33bbcf] h-full z-0 rounded-full shadow-lg shadow-[#87CEEB]/50 animate-pulse"></div>

              {/* Event Card - Flex Row Layout */}
              <div className="relative w-full max-w-[900px] mb-12 flex items-center justify-center">
                {/* Timeline Dot with enhanced glow */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-[20px] h-[20px] bg-gradient-to-r from-[#87CEEB] to-[#33bbcf] rounded-full border-4 border-[#01011b] z-20 shadow-lg shadow-[#87CEEB]/60 animate-pulse"></div>

                {/* Event Card with Border - Flex Row */}
                <Link href="/" className="no-underline w-full">
                  <div className="border-2 border-[#87CEEB]/60 rounded-[20px] p-8 bg-gradient-to-br from-[#0a0a2e]/90 to-[#01011b]/95 hover:border-[#33bbcf] transition-all duration-500 hover:shadow-2xl hover:shadow-[#87CEEB]/30 backdrop-blur-sm hover:scale-[1.02] transform hover:-translate-y-2">
                    
                    {/* Flex Row Container */}
                    <div className="flex items-center gap-8 max-lg:flex-col max-lg:gap-6">
                      
                      {/* Event Image - Left Side */}
                      <div className="relative h-[240px] w-[400px] max-lg:w-full flex-shrink-0 group">
                        <Image
                          src={eventx.image}
                          alt="event"
                          fill
                          className="rounded-[16px] object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                          sizes="(max-width: 1024px) 100vw, 400px"
                          priority={index < 2}
                        />
                        {/* Image overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#33bbcf]/20 to-transparent rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Event Content - Right Side */}
                      <div className="event_content flex-1 text-center">
                        <h3 className="mx-0 mt-2 mb-6 font-[kanit] text-[32px] text-white max-lg:text-[28px] hover:text-[#87CEEB] transition-colors duration-300 drop-shadow-lg">
                          {eventx.heading}
                        </h3>

                        {/* Sponsors Section */}
                        {Array.isArray(eventx.sponsor) && eventx.sponsor.length > 0 && (
                          <div className="mt-6 flex flex-col items-center gap-4">
                            <div className="font-poppins text-[22px] text-[#87CEEB] font-semibold">
                              <h5 className="drop-shadow-md">Sponsored by:</h5>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4">
                              {eventx.sponsor.map((sponsor, i) => (
                                <div key={i} className="flex items-center gap-3 bg-[#87CEEB]/10 rounded-full px-4 py-2 hover:bg-[#87CEEB]/20 transition-all duration-300  backdrop-blur-sm border border-[#87CEEB]/30">
                                  <div className="relative h-[40px] w-[40px] group">
                                    <Image
                                      src={eventx.sponsor_img[i]}
                                      alt={sponsor}
                                      fill
                                      className="rounded-full object-cover border-2 border-[#87CEEB]/50 group-hover:border-[#87CEEB] transition-all duration-300"
                                      sizes="40px"
                                    />
                                  </div>
                                  <h4 className="mx-[8px] my-0 text-white text-[16px] font-medium drop-shadow-sm">
                                    {sponsor}
                                  </h4>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default page;