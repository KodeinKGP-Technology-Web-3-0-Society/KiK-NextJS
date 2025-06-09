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

// const page = () => {
//   return (
//     <div className="min-h-screen bg-[#01011b] relative overflow-hidden">
//       {/* Background Effects */}
//       <div className="absolute inset-0 opacity-30">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-[#33bbcf]/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-32 right-16 w-96 h-96 bg-[#87CEEB]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#def9fa]/15 rounded-full blur-3xl animate-pulse delay-500"></div>
//       </div>

//       <section className="relative z-10">
//         {data?.map((eventx, index) => (
//           <div className="mx-auto flex w-[95%] flex-col relative" key={index}>
//             {/* Event Container */}
//             <h2
//               className="mt-[32px] mb-6 ml-[5px] bg-clip-text font-[kanit] text-[48px] font-bold max-lg:ml-4 max-lg:text-[35px] text-center animate-fadeInUp"
//               style={{
//                 marginBottom: index === 0 || index === 5 ? "3.5rem" : "0",
//                 background: `radial-gradient(64.18% 64.18% at 71.16% 35.69%, 
//                             #def9fa 0.89%, #bef3f5 17.23%, #9dedf0 42.04%, 
//                             #7de7eb 55.12%, #5ce1e6 71.54%, #33bbcf 100%)`,
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//                 filter: "drop-shadow(0 0 20px rgba(135, 206, 235, 0.3))",
//               }}
//             >
//               {index === 0 ? (
//                 <div className="flex items-center justify-center gap-5 max-lg:flex-col">
//                   Previous Hackathons
//                   <img
//                     src="https://i0.wp.com/www.sciencenews.org/wp-content/uploads/2023/04/040823_chatgpt_feat.gif?fit=1024%2C576&ssl=1"
//                     className="w-[200px] h-[120px] rounded-full border-4 border-[#87CEEB]/50 shadow-lg shadow-[#87CEEB]/30 hover:scale-110 transition-transform duration-300"
//                   />
//                 </div>
//               ) : index === 5 ? (
//                 <div className="flex items-center justify-center gap-5 max-lg:flex-col">
//                   Previous Workshops
//                   <img
//                     src="https://i.pinimg.com/originals/bb/0c/c7/bb0cc783196fa9b2119864ff90eb5702.gif"
//                     className="w-[200px] h-[120px] rounded-full border-4 border-[#87CEEB]/50 shadow-lg shadow-[#87CEEB]/30 hover:scale-110 transition-transform duration-300"
//                   />
//                 </div>
//               ) : null}
//             </h2>

//             {/* Timeline Container */}
//             <div className="relative flex justify-center">
//               {/* Enhanced Timeline Line with glow effect */}
//               <div className="absolute left-1/2 transform -translate-x-1/2 w-[6px] bg-gradient-to-b from-[#87CEEB] via-[#5ce1e6] to-[#33bbcf] h-full z-0 rounded-full shadow-lg shadow-[#87CEEB]/50 animate-pulse"></div>

//               {/* Event Card - Flex Row Layout */}
//               <div className="relative w-full max-w-[900px] mb-12 flex items-center justify-center">
//                 {/* Timeline Dot with enhanced glow */}
//                 <div className="absolute left-1/2 transform -translate-x-1/2 w-[20px] h-[20px] bg-gradient-to-r from-[#87CEEB] to-[#33bbcf] rounded-full border-4 border-[#01011b] z-20 shadow-lg shadow-[#87CEEB]/60 animate-pulse"></div>

//                 {/* Event Card with Border - Flex Row */}
//                 <Link href="/" className="no-underline w-full">
//                   <div className="border-2 border-[#87CEEB]/60 rounded-[20px] p-8 bg-gradient-to-br from-[#0a0a2e]/90 to-[#01011b]/95 hover:border-[#33bbcf] transition-all duration-500 hover:shadow-2xl hover:shadow-[#87CEEB]/30 backdrop-blur-sm hover:scale-[1.02] transform hover:-translate-y-2">
                    
//                     {/* Flex Row Container */}
//                     <div className="flex items-center gap-8 max-lg:flex-col max-lg:gap-6">
                      
//                       {/* Event Image - Left Side */}
//                       <div className="relative h-[240px] w-[400px] max-lg:w-full flex-shrink-0 group">
//                         <Image
//                           src={eventx.image}
//                           alt="event"
//                           fill
//                           className="rounded-[16px] object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
//                           sizes="(max-width: 1024px) 100vw, 400px"
//                           priority={index < 2}
//                         />
//                         {/* Image overlay effect */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-[#33bbcf]/20 to-transparent rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                       </div>

//                       {/* Event Content - Right Side */}
//                       <div className="event_content flex-1 text-center">
//                         <h3 className="mx-0 mt-2 mb-6 font-[kanit] text-[32px] text-white max-lg:text-[28px] hover:text-[#87CEEB] transition-colors duration-300 drop-shadow-lg">
//                           {eventx.heading}
//                         </h3>

//                         {/* Sponsors Section */}
//                         {Array.isArray(eventx.sponsor) && eventx.sponsor.length > 0 && (
//                           <div className="mt-6 flex flex-col items-center gap-4">
//                             <div className="font-poppins text-[22px] text-[#87CEEB] font-semibold">
//                               <h5 className="drop-shadow-md">Sponsored by:</h5>
//                             </div>
//                             <div className="flex flex-wrap justify-center gap-4">
//                               {eventx.sponsor.map((sponsor, i) => (
//                                 <div key={i} className="flex items-center gap-3 bg-[#87CEEB]/10 rounded-full px-4 py-2 hover:bg-[#87CEEB]/20 transition-all duration-300  backdrop-blur-sm border border-[#87CEEB]/30">
//                                   <div className="relative h-[40px] w-[40px] group">
//                                     <Image
//                                       src={eventx.sponsor_img[i]}
//                                       alt={sponsor}
//                                       fill
//                                       className="rounded-full object-cover border-2 border-[#87CEEB]/50 group-hover:border-[#87CEEB] transition-all duration-300"
//                                       sizes="40px"
//                                     />
//                                   </div>
//                                   <h4 className="mx-[8px] my-0 text-white text-[16px] font-medium drop-shadow-sm">
//                                     {sponsor}
//                                   </h4>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fadeInUp {
//           animation: fadeInUp 0.8s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default page;

// const page = () => {
//   return (
//     <div className="min-h-screen bg-[#01011b] relative overflow-hidden">
//       {/* Background Effects */}
//       <div className="absolute inset-0 opacity-30">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-[#33bbcf]/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-32 right-16 w-96 h-96 bg-[#87CEEB]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#def9fa]/15 rounded-full blur-3xl animate-pulse delay-500"></div>
//       </div>

//       <section className="relative z-10">
//         {data?.map((eventx, index) => (
//           <div className="mx-auto flex w-[95%] flex-col relative" key={index}>
//             {/* Event Container */}
//             <h2
//               className="mt-[32px] mb-6 ml-[5px] bg-clip-text font-[kanit] text-[48px] font-bold max-lg:ml-4 max-lg:text-[35px] text-center animate-fadeInUp"
//               style={{
//                 marginBottom: index === 0 || index === 5 ? "3.5rem" : "0",
//                 background: `radial-gradient(64.18% 64.18% at 71.16% 35.69%, 
//                             #def9fa 0.89%, #bef3f5 17.23%, #9dedf0 42.04%, 
//                             #7de7eb 55.12%, #5ce1e6 71.54%, #33bbcf 100%)`,
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//                 filter: "drop-shadow(0 0 20px rgba(135, 206, 235, 0.3))",
//               }}
//             >
//               {index === 0 ? (
//                 <div className="flex items-center justify-center gap-5 max-lg:flex-col">
//                   Previous Hackathons
//                   <img
//                     src="https://i0.wp.com/www.sciencenews.org/wp-content/uploads/2023/04/040823_chatgpt_feat.gif?fit=1024%2C576&ssl=1"
//                     className="w-[200px] h-[120px] rounded-full border-4 border-[#87CEEB]/50 shadow-lg shadow-[#87CEEB]/30 hover:scale-110 transition-transform duration-300"
//                   />
//                 </div>
//               ) : index === 5 ? (
//                 <div className="flex items-center justify-center gap-5 max-lg:flex-col">
//                   Previous Workshops
//                   <img
//                     src="https://i.pinimg.com/originals/bb/0c/c7/bb0cc783196fa9b2119864ff90eb5702.gif"
//                     className="w-[200px] h-[120px] rounded-full border-4 border-[#87CEEB]/50 shadow-lg shadow-[#87CEEB]/30 hover:scale-110 transition-transform duration-300"
//                   />
//                 </div>
//               ) : null}
//             </h2>

//             {/* Timeline Container */}
//             <div className="relative flex justify-center">
//               {/* Enhanced Timeline Line with glow effect */}
//               <div className="absolute left-1/2 transform -translate-x-1/2 w-[6px] bg-gradient-to-b from-[#87CEEB] via-[#5ce1e6] to-[#33bbcf] h-full z-0 rounded-full shadow-lg shadow-[#87CEEB]/50 animate-pulse"></div>

//               {/* Event Card - Flex Row Layout */}
//               <div className="relative w-full max-w-[900px] mb-12 flex items-center justify-center group">
//                 {/* Timeline Dot with enhanced glow */}
//                 <div className="absolute left-1/2 transform -translate-x-1/2 w-[20px] h-[20px] bg-gradient-to-r from-[#87CEEB] to-[#33bbcf] rounded-full border-4 border-[#01011b] z-20 shadow-lg shadow-[#87CEEB]/60 animate-pulse group-hover:scale-150 group-hover:shadow-[#87CEEB] transition-all duration-500"></div>

//                 {/* Event Card with Border - Flex Row */}
//                 <div className="border-2 border-[#87CEEB]/60 rounded-[20px] p-8 bg-gradient-to-br from-[#0a0a2e]/90 to-[#01011b]/95 hover:border-[#33bbcf] transition-all duration-500 hover:shadow-2xl hover:shadow-[#87CEEB]/30 backdrop-blur-sm hover:scale-[1.02] transform hover:-translate-y-2 relative overflow-hidden w-full cursor-default">
                    
//                     {/* Hover glow effect */}
//                     <div className="absolute inset-0 bg-gradient-to-r from-[#87CEEB]/5 via-[#33bbcf]/10 to-[#87CEEB]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px]"></div>
                    
//                     {/* Flex Row Container */}
//                     <div className="flex items-center gap-8 max-lg:flex-col max-lg:gap-6 relative z-10">
                      
//                       {/* Event Image - Left Side */}
//                       <div className="relative h-[240px] w-[400px] max-lg:w-full flex-shrink-0 group/image">
//                         <Image
//                           src={eventx.image}
//                           alt="event"
//                           fill
//                           className="rounded-[16px] object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 group-hover:saturate-110"
//                           sizes="(max-width: 1024px) 100vw, 400px"
//                           priority={index < 2}
//                         />
//                         {/* Enhanced image overlay effect */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-[#33bbcf]/30 via-[#87CEEB]/10 to-transparent rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
//                         {/* Animated border effect on hover */}
//                         <div className="absolute inset-0 rounded-[16px] border-2 border-transparent group-hover:border-[#87CEEB]/50 transition-all duration-500"></div>
//                       </div>

//                       {/* Event Content - Right Side with hover transformation */}
//                       <div className="event_content flex-1 text-center relative overflow-hidden min-h-[240px] flex items-center justify-center">
                        
//                         {/* Default Content (visible by default, hidden on hover) */}
//                         <div className="absolute inset-0 flex flex-col justify-center items-center opacity-100 group-hover:opacity-0 group-hover:scale-95 group-hover:-translate-y-4 transition-all duration-500 ease-in-out">
//                           <h3 className="mx-0 mt-2 mb-6 font-[kanit] text-[32px] text-white max-lg:text-[28px] hover:text-[#87CEEB] transition-colors duration-300 drop-shadow-lg">
//                             {eventx.heading}
//                           </h3>

//                           {/* Sponsors Section */}
//                           {Array.isArray(eventx.sponsor) && eventx.sponsor.length > 0 && (
//                             <div className="mt-6 flex flex-col items-center gap-4">
//                               <div className="font-poppins text-[22px] text-[#87CEEB] font-semibold">
//                                 <h5 className="drop-shadow-md">Sponsored by:</h5>
//                               </div>
//                               <div className="flex flex-wrap justify-center gap-4">
//                                 {eventx.sponsor.map((sponsor, i) => (
//                                   <div key={i} className="flex items-center gap-3 bg-[#87CEEB]/10 rounded-full px-4 py-2 hover:bg-[#87CEEB]/20 transition-all duration-300 backdrop-blur-sm border border-[#87CEEB]/30">
//                                     <div className="relative h-[40px] w-[40px] group/sponsor">
//                                       <Image
//                                         src={eventx.sponsor_img[i]}
//                                         alt={sponsor}
//                                         fill
//                                         className="rounded-full object-cover border-2 border-[#87CEEB]/50 group-hover/sponsor:border-[#87CEEB] transition-all duration-300"
//                                         sizes="40px"
//                                       />
//                                     </div>
//                                     <h4 className="mx-[8px] my-0 text-white text-[16px] font-medium drop-shadow-sm">
//                                       {sponsor}
//                                     </h4>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                         </div>

//                         {/* Description Content (hidden by default, visible on hover) */}
//                         <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-hover:scale-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out delay-100">
                          
//                           {/* Animated heading */}
//                           <h3 className="font-[kanit] text-[28px] text-[#87CEEB] mb-4 max-lg:text-[24px] drop-shadow-lg animate-slideInFromTop">
//                             {eventx.heading}
//                           </h3>
                          
//                           {/* Description with typewriter-like effect */}
//                           <div className="relative max-w-full">
//                             <p className="text-white text-[16px] leading-relaxed font-[poppins] px-4 text-center animate-fadeInScale">
//                               {eventx.description}
//                             </p>
                            
//                             {/* Glowing border effect around description */}
//                             <div className="absolute -inset-2 bg-gradient-to-r from-[#87CEEB]/20 via-[#33bbcf]/20 to-[#87CEEB]/20 rounded-lg blur-lg opacity-50 animate-pulse"></div>
//                           </div>
                          
//                           {/* Decorative elements */}
//                           <div className="flex gap-2 mt-4 animate-fadeInScale delay-200">
//                             <div className="w-2 h-2 bg-[#87CEEB] rounded-full animate-pulse"></div>
//                             <div className="w-2 h-2 bg-[#33bbcf] rounded-full animate-pulse delay-100"></div>
//                             <div className="w-2 h-2 bg-[#87CEEB] rounded-full animate-pulse delay-200"></div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideInFromTop {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes fadeInScale {
//           from {
//             opacity: 0;
//             transform: scale(0.9);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
        
//         .animate-fadeInUp {
//           animation: fadeInUp 0.8s ease-out;
//         }
        
//         .animate-slideInFromTop {
//           animation: slideInFromTop 0.6s ease-out;
//         }
        
//         .animate-fadeInScale {
//           animation: fadeInScale 0.7s ease-out;
//         }
        
//         .delay-100 {
//           animation-delay: 0.1s;
//         }
        
//         .delay-200 {
//           animation-delay: 0.2s;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default page;


// const page = () => {
//   return (
//     <div className="min-h-screen bg-[#01011b] relative overflow-hidden">
//       {/* Background Effects */}
//       <div className="absolute inset-0 opacity-30">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-[#33bbcf]/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-32 right-16 w-96 h-96 bg-[#87CEEB]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#def9fa]/15 rounded-full blur-3xl animate-pulse delay-500"></div>
//       </div>

//       <section className="relative z-10">
//         {data?.map((eventx, index) => (
//           <div className="mx-auto flex w-[95%] flex-col relative" key={index}>
//             {/* Event Container */}
//             <h2
//               className="mt-[32px] mb-6 ml-[5px] bg-clip-text font-[kanit] text-[48px] font-bold max-lg:ml-4 max-lg:text-[35px] text-center animate-fadeInUp"
//               style={{
//                 marginBottom: index === 0 || index === 5 ? "3.5rem" : "0",
//                 background: `radial-gradient(64.18% 64.18% at 71.16% 35.69%, 
//                             #def9fa 0.89%, #bef3f5 17.23%, #9dedf0 42.04%, 
//                             #7de7eb 55.12%, #5ce1e6 71.54%, #33bbcf 100%)`,
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 backgroundClip: "text",
//                 filter: "drop-shadow(0 0 20px rgba(135, 206, 235, 0.3))",
//               }}
//             >
//               {index === 0 ? (
//                 <div className="flex items-center justify-center gap-5 max-lg:flex-col">
//                   Previous Hackathons
//                   <img
//                     src="https://i0.wp.com/www.sciencenews.org/wp-content/uploads/2023/04/040823_chatgpt_feat.gif?fit=1024%2C576&ssl=1"
//                     className="w-[200px] h-[120px] rounded-full border-4 border-[#87CEEB]/50 shadow-lg shadow-[#87CEEB]/30 hover:scale-110 transition-transform duration-300"
//                   />
//                 </div>
//               ) : index === 5 ? (
//                 <div className="flex items-center justify-center gap-5 max-lg:flex-col">
//                   Previous Workshops
//                   <img
//                     src="https://i.pinimg.com/originals/bb/0c/c7/bb0cc783196fa9b2119864ff90eb5702.gif"
//                     className="w-[200px] h-[120px] rounded-full border-4 border-[#87CEEB]/50 shadow-lg shadow-[#87CEEB]/30 hover:scale-110 transition-transform duration-300"
//                   />
//                 </div>
//               ) : null}
//             </h2>

//             {/* Timeline Container */}
//             <div className="relative flex justify-center">
//               {/* Enhanced Timeline Line with glow effect */}
//               <div className="absolute left-1/2 transform -translate-x-1/2 w-[6px] bg-gradient-to-b from-[#87CEEB] via-[#5ce1e6] to-[#33bbcf] h-full z-0 rounded-full shadow-lg shadow-[#87CEEB]/50 animate-pulse"></div>

//               {/* Event Card - Flex Row Layout */}
//               <div className="relative w-full max-w-[900px] mb-12 flex items-center justify-center group">
//                 {/* Timeline Dot with enhanced glow */}
//                 <div className="absolute left-1/2 transform -translate-x-1/2 w-[20px] h-[20px] bg-gradient-to-r from-[#87CEEB] to-[#33bbcf] rounded-full border-4 border-[#01011b] z-20 shadow-lg shadow-[#87CEEB]/60 animate-pulse group-hover:scale-150 group-hover:shadow-[#87CEEB] transition-all duration-500"></div>

//                 {/* Event Card with Border - Flex Row */}
//                 <div className="border-2 border-[#87CEEB]/60 rounded-[20px] p-8 bg-gradient-to-br from-[#0a0a2e]/90 to-[#01011b]/95 hover:border-[#33bbcf] transition-all duration-500 hover:shadow-2xl hover:shadow-[#87CEEB]/30 backdrop-blur-sm hover:scale-[1.02] transform hover:-translate-y-2 relative overflow-hidden w-full cursor-default">
                  
//                   {/* Hover glow effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-[#87CEEB]/5 via-[#33bbcf]/10 to-[#87CEEB]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px]"></div>
                  
//                   {/* Flex Row Container */}
//                   <div className="flex items-center gap-8 max-lg:flex-col max-lg:gap-6 relative z-10">
                    
//                     {/* Event Image - Left Side (Static) */}
//                     <div className="relative h-[240px] w-[400px] max-lg:w-full flex-shrink-0 group/image">
//                       <Image
//                         src={eventx.image}
//                         alt="event"
//                         fill
//                         className="rounded-[16px] object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 group-hover:saturate-110"
//                         sizes="(max-width: 1024px) 100vw, 400px"
//                         priority={index < 2}
//                       />
//                       {/* Enhanced image overlay effect */}
//                       <div className="absolute inset-0 bg-gradient-to-t from-[#33bbcf]/30 via-[#87CEEB]/10 to-transparent rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
//                       {/* Animated border effect on hover */}
//                       <div className="absolute inset-0 rounded-[16px] border-2 border-transparent group-hover:border-[#87CEEB]/50 transition-all duration-500"></div>
//                     </div>

//                     {/* Content Section with Flip Effect */}
//                     <div className="flex-1 min-h-[240px] flex items-center justify-center perspective-1000">
//                       <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                        
//                         {/* Front Face - Default Content */}
//                         <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col justify-center items-center text-center">
//                           <h3 className="mx-0 mt-2 mb-6 font-[kanit] text-[32px] text-white max-lg:text-[28px] hover:text-[#87CEEB] transition-colors duration-300 drop-shadow-lg">
//                             {eventx.heading}
//                           </h3>

//                           {/* Sponsors Section */}
//                           {Array.isArray(eventx.sponsor) && eventx.sponsor.length > 0 && (
//                             <div className="mt-6 flex flex-col items-center gap-4">
//                               <div className="font-poppins text-[22px] text-[#87CEEB] font-semibold">
//                                 <h5 className="drop-shadow-md">Sponsored by:</h5>
//                               </div>
//                               <div className="flex flex-wrap justify-center gap-4">
//                                 {eventx.sponsor.map((sponsor, i) => (
//                                   <div key={i} className="flex items-center gap-3 bg-[#87CEEB]/10 rounded-full px-4 py-2 hover:bg-[#87CEEB]/20 transition-all duration-300 backdrop-blur-sm border border-[#87CEEB]/30">
//                                     <div className="relative h-[40px] w-[40px] group/sponsor">
//                                       <Image
//                                         src={eventx.sponsor_img[i]}
//                                         alt={sponsor}
//                                         fill
//                                         className="rounded-full object-cover border-2 border-[#87CEEB]/50 group-hover/sponsor:border-[#87CEEB] transition-all duration-300"
//                                         sizes="40px"
//                                       />
//                                     </div>
//                                     <h4 className="mx-[8px] my-0 text-white text-[16px] font-medium drop-shadow-sm">
//                                       {sponsor}
//                                     </h4>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                         </div>

//                         {/* Back Face - Description Content */}
//                         <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex flex-col justify-center items-center text-center p-4 bg-gradient-to-br from-[#1a1a3e]/20 to-[#0a0a2e]/20 rounded-lg">
                          
//                           {/* Animated background pattern */}
//                           <div className="absolute inset-0 opacity-10 rounded-lg">
//                             <div className="absolute top-4 left-4 w-12 h-12 border-2 border-[#87CEEB] rounded-full animate-float"></div>
//                             <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-[#33bbcf] rounded-full animate-float-delay"></div>
//                             <div className="absolute top-1/2 left-4 w-6 h-6 bg-[#87CEEB]/20 rounded-full animate-pulse"></div>
//                           </div>
                          
//                           {/* Title with glow */}
//                           <h3 className="font-[kanit] text-[28px] text-transparent bg-clip-text bg-gradient-to-r from-[#87CEEB] to-[#33bbcf] mb-6 max-lg:text-[24px] drop-shadow-lg animate-glow">
//                             {eventx.heading}
//                           </h3>
                          
//                           {/* Description */}
//                           <div className="relative max-w-full">
//                             <p className="text-white text-[16px] leading-relaxed font-[poppins] text-center animate-typewriter">
//                               {eventx.description}
//                             </p>
                            
//                             {/* Glowing border effect around description */}
//                             <div className="absolute -inset-2 bg-gradient-to-r from-[#87CEEB]/20 via-[#33bbcf]/20 to-[#87CEEB]/20 rounded-lg blur-lg opacity-50 animate-pulse"></div>
//                           </div>
                          
//                           {/* Decorative line */}
//                           <div className="mt-6 w-32 h-1 bg-gradient-to-r from-transparent via-[#87CEEB] to-transparent animate-shimmer"></div>
                          
//                           {/* Floating particles */}
//                           <div className="absolute inset-0 pointer-events-none">
//                             <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#87CEEB] rounded-full animate-float-particle"></div>
//                             <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-[#33bbcf] rounded-full animate-float-particle-delay"></div>
//                             <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-[#def9fa] rounded-full animate-float-particle-slow"></div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>

//       <style jsx>{`
//         .perspective-1000 {
//           perspective: 1000px;
//         }
        
//         .transform-style-preserve-3d {
//           transform-style: preserve-3d;
//         }
        
//         .backface-hidden {
//           backface-visibility: hidden;
//         }
        
//         .rotate-y-180 {
//           transform: rotateY(180deg);
//         }
        
//         .group:hover .group-hover\\:rotate-y-180 {
//           transform: rotateY(180deg);
//         }
        
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-8px) rotate(180deg);
//           }
//         }
        
//         @keyframes float-delay {
//           0%, 100% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-6px) rotate(-180deg);
//           }
//         }
        
//         @keyframes float-particle {
//           0%, 100% {
//             transform: translateY(0px) translateX(0px);
//             opacity: 0.3;
//           }
//           50% {
//             transform: translateY(-15px) translateX(8px);
//             opacity: 1;
//           }
//         }
        
//         @keyframes float-particle-delay {
//           0%, 100% {
//             transform: translateY(0px) translateX(0px);
//             opacity: 0.3;
//           }
//           50% {
//             transform: translateY(-12px) translateX(-8px);
//             opacity: 1;
//           }
//         }
        
//         @keyframes float-particle-slow {
//           0%, 100% {
//             transform: translateY(0px) translateX(0px);
//             opacity: 0.2;
//           }
//           50% {
//             transform: translateY(-18px) translateX(4px);
//             opacity: 0.8;
//           }
//         }
        
//         @keyframes glow {
//           0%, 100% {
//             filter: drop-shadow(0 0 10px rgba(135, 206, 235, 0.5));
//           }
//           50% {
//             filter: drop-shadow(0 0 20px rgba(135, 206, 235, 0.8));
//           }
//         }
        
//         @keyframes typewriter {
//           from {
//             opacity: 0;
//             transform: translateX(-15px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes shimmer {
//           0% {
//             transform: translateX(-100%);
//           }
//           100% {
//             transform: translateX(100%);
//           }
//         }
        
//         .animate-fadeInUp {
//           animation: fadeInUp 0.8s ease-out;
//         }
        
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
        
//         .animate-float-delay {
//           animation: float-delay 3s ease-in-out infinite 1s;
//         }
        
//         .animate-float-particle {
//           animation: float-particle 4s ease-in-out infinite;
//         }
        
//         .animate-float-particle-delay {
//           animation: float-particle-delay 4s ease-in-out infinite 2s;
//         }
        
//         .animate-float-particle-slow {
//           animation: float-particle-slow 6s ease-in-out infinite 1s;
//         }
        
//         .animate-glow {
//           animation: glow 2s ease-in-out infinite;
//         }
        
//         .animate-typewriter {
//           animation: typewriter 0.8s ease-out 0.3s both;
//         }
        
//         .animate-shimmer {
//           animation: shimmer 2s ease-in-out infinite;
//         }
//       `}</style>
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
              <div className="relative w-full max-w-[900px] mb-12 flex items-center justify-center group">
                {/* Timeline Dot with enhanced glow */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-[20px] h-[20px] bg-gradient-to-r from-[#87CEEB] to-[#33bbcf] rounded-full border-4 border-[#01011b] z-20 shadow-lg shadow-[#87CEEB]/60 animate-pulse group-hover:scale-150 group-hover:shadow-[#87CEEB] transition-all duration-500"></div>

                {/* Event Card with Border - Flex Row */}
                <div className="border-2 border-[#87CEEB]/60 rounded-[20px] p-8 bg-gradient-to-br from-[#0a0a2e]/90 to-[#01011b]/95 hover:border-[#33bbcf] transition-all duration-500 hover:shadow-2xl hover:shadow-[#87CEEB]/30 backdrop-blur-sm hover:scale-[1.02] transform hover:-translate-y-2 relative overflow-hidden w-full cursor-default">
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#87CEEB]/5 via-[#33bbcf]/10 to-[#87CEEB]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px]"></div>
                  
                  {/* Flex Row Container */}
                  <div className="flex items-center gap-8 max-lg:flex-col max-lg:gap-6 relative z-10">
                    
                    {/* Event Image - Left Side (Static) */}
                    <div className="relative h-[240px] w-[400px] max-lg:w-full flex-shrink-0 group/image">
                      <Image
                        src={eventx.image}
                        alt="event"
                        fill
                        className="rounded-[16px] object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 group-hover:saturate-110"
                        sizes="(max-width: 1024px) 100vw, 400px"
                        priority={index < 2}
                      />
                      {/* Enhanced image overlay effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#33bbcf]/30 via-[#87CEEB]/10 to-transparent rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Animated border effect on hover */}
                      <div className="absolute inset-0 rounded-[16px] border-2 border-transparent group-hover:border-[#87CEEB]/50 transition-all duration-500"></div>
                    </div>

                    {/* Content Section with Flip Effect */}
                    <div className="flex-1 min-h-[240px] flex items-center justify-center perspective-1000">
                      <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                        
                        {/* Front Face - Default Content */}
                        <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col justify-center items-center text-center">
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
                                  <div key={i} className="flex items-center gap-3 bg-[#87CEEB]/10 rounded-full px-4 py-2 hover:bg-[#87CEEB]/20 transition-all duration-300 backdrop-blur-sm border border-[#87CEEB]/30">
                                    <div className="relative h-[40px] w-[40px] group/sponsor">
                                      <Image
                                        src={eventx.sponsor_img[i]}
                                        alt={sponsor}
                                        fill
                                        className="rounded-full object-cover border-2 border-[#87CEEB]/50 group-hover/sponsor:border-[#87CEEB] transition-all duration-300"
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

                        {/* Back Face - Description Content */}
                        <div className="relative inset-0 w-full h-full backface-hidden rotate-y-180 flex flex-col justify-center items-center text-center p-4 bg-gradient-to-br from-[#1a1a3e]/20 to-[#0a0a2e]/20 rounded-lg">
                          
                          {/* Animated background pattern */}
                          <div className="absolute inset-0 opacity-10 rounded-lg">
                            <div className="absolute top-4 left-4 w-12 h-12 border-2 border-[#87CEEB] rounded-full animate-float"></div>
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-[#33bbcf] rounded-full animate-float-delay"></div>
                            <div className="absolute top-1/2 left-4 w-6 h-6 bg-[#87CEEB]/20 rounded-full animate-pulse"></div>
                          </div>
                          
                          {/* Title with glow */}
                          <h3 className="font-[kanit] text-[28px] text-transparent bg-clip-text bg-gradient-to-r from-[#87CEEB] to-[#33bbcf] mb-6 max-lg:text-[24px] drop-shadow-lg animate-glow">
                            {eventx.heading}
                          </h3>
                          
                          {/* Description */}
                          <div className="relative max-w-full">
                            <p className="text-white text-[16px] leading-relaxed font-[poppins] text-center animate-typewriter">
                              {eventx.description}
                            </p>
                            
                            {/* Glowing border effect around description */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#87CEEB]/20 via-[#33bbcf]/20 to-[#87CEEB]/20 rounded-lg blur-lg opacity-50 animate-pulse"></div>
                          </div>
                          
                          {/* Decorative line */}
                          <div className="mt-6 w-32 h-1 bg-gradient-to-r from-transparent via-[#87CEEB] to-transparent animate-shimmer"></div>
                          
                          {/* Floating particles */}
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#87CEEB] rounded-full animate-float-particle"></div>
                            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-[#33bbcf] rounded-full animate-float-particle-delay"></div>
                            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-[#def9fa] rounded-full animate-float-particle-slow"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .group:hover .group-hover\\:rotate-y-180 {
          transform: rotateY(180deg);
        }
        
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
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(180deg);
          }
        }
        
        @keyframes float-delay {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-6px) rotate(-180deg);
          }
        }
        
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-15px) translateX(8px);
            opacity: 1;
          }
        }
        
        @keyframes float-particle-delay {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-12px) translateX(-8px);
            opacity: 1;
          }
        }
        
        @keyframes float-particle-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-18px) translateX(4px);
            opacity: 0.8;
          }
        }
        
        @keyframes glow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(135, 206, 235, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(135, 206, 235, 0.8));
          }
        }
        
        @keyframes typewriter {
          from {
            opacity: 0;
            transform: translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 3s ease-in-out infinite 1s;
        }
        
        .animate-float-particle {
          animation: float-particle 4s ease-in-out infinite;
        }
        
        .animate-float-particle-delay {
          animation: float-particle-delay 4s ease-in-out infinite 2s;
        }
        
        .animate-float-particle-slow {
          animation: float-particle-slow 6s ease-in-out infinite 1s;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-typewriter {
          animation: typewriter 0.8s ease-out 0.3s both;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default page;
