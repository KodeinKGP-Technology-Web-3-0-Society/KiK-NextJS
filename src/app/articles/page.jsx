import React from "react";
import LottieWrapper from "./LottieWrapper";
import data from "../../data/articles/articles-list.json";
import { Poppins, Montserrat } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "600" });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-montserrat",
  display: "swap",
});

const Articles = () => {
  const cards = data.map((info, index) => (
    <div key={index} className="">
      <a
        className="relative flex h-[140px] w-[min(31vw,550px)] overflow-hidden rounded-[2.5vw] border-4 border-transparent bg-[rgba(54,54,54,0.4)] transition duration-150 hover:border-[#3dc4d4] hover:bg-[#39394080] hover:shadow-[0_0_12px_#3dc4d4] max-[1300px]:w-[50vw] max-[800px]:block max-[800px]:h-[420px] max-[800px]:w-full max-[800px]:justify-center max-[550px]:h-[380px] max-[550px]:w-[17.5rem] max-[550px]:rounded-[5vw] xl:w-[min(31vw,550px)]"
        href={info.link}
        target="_blank"
      >
        <img
          src={info.img}
          alt=""
          className="relative h-full w-[150px] self-center max-[800px]:h-[45%] max-[800px]:w-full max-[550px]:h-[50%]"
        />
        <div className="ml-[10px] flex w-[65%] flex-col justify-center gap-[10px] px-2">
          <p className="absolute top-[15px] z-10 text-[13px] leading-[22px] font-semibold text-[#11e3fb] not-italic max-[1300px]:text-[15px] max-[800px]:top-[230px] max-[800px]:text-[17px] max-[550px]:top-[200px] max-[550px]:text-[13px]">
            {info.pubDate}
          </p>
          <p className="absolute top-[40px] z-10 pr-[15px] font-['Montserrat'] text-[17px] leading-[28px] font-semibold text-white not-italic max-[800px]:top-[260px] max-[800px]:w-full max-[800px]:pr-[30px] max-[800px]:text-[22px] max-[800px]:leading-normal max-[550px]:top-[230px] max-[550px]:text-[19px]">
            {info.title}
          </p>
        </div>
      </a>
    </div>
  ));
  return (
    <div className="flex flex-col bg-[#01011b]">
      {/* article heading  */}
      <div className="mb-0 flex flex-row max-[1300px]:mb-20 max-[800px]:flex-col">
        <div className="flex w-[55vw] flex-col justify-between self-center max-[800px]:w-[90vw]">
          <div
            className={`ml-[2.5vw] font-semibold ${poppins.className} animate-gradient-shift flex self-center bg-gradient-to-r from-[#11e3fb] via-[#b5f6fd] to-[#5be6ff] [background-size:300%_auto] bg-clip-text [background-position:0%_50%] pl-0 text-[4rem] leading-[100px] tracking-[0.1rem] text-transparent sm:text-[6rem] sm:leading-[120px] md:self-start md:pl-[3rem] lg:text-[7rem] xl:text-[8rem]`}
          >
            Articles
          </div>
          <div
            className={`self-start text-white ${montserrat.className} mt-14 pl-24 font-light max-[800px]:pl-12 max-[500px]:mt-6 max-[500px]:pl-0 max-[500px]:text-center`}
          >
            <div className="mb-4 text-[2rem] leading-tight max-[1300px]:text-[1.8rem] max-[550px]:text-[1.2rem]">
              Your Gateway to AI, Web Dev, and Blockchain
            </div>
            <p className="text-2xl font-thin max-[1300px]:text-[1.2rem] max-[550px]:text-[1rem]">
              Explore cutting-edge trends and insights shaping the future of
              technology.
            </p>
          </div>
        </div>
        <div className="w-[35vw] self-start max-[800px]:w-[50vw] max-[800px]:self-center max-[550px]:w-[70vw]">
          <LottieWrapper />
        </div>
      </div>

      {/* article card  */}
      <div className="flex w-[95vw] justify-center gap-[2vw] self-center max-[800px]:flex-col max-[800px]:items-center max-[550px]:overflow-x-hidden">
        {/* big card  */}
        <div className="relative">
          <div className="h-[475px] w-[25vw] max-w-[420px] min-w-[330px] rounded-[2.5vw] px-3 pt-0.5">
            <a
              className="group relative block h-full w-full overflow-hidden rounded-[2.5vw] bg-[#39394080] transition-all duration-150 hover:border-4 hover:border-[#3dc4d4] hover:shadow-[0_0_12px_#3dc4d4]"
              href={data[0].link}
              target="_blank"
            >
              <img
                className="relative h-[45%] w-full"
                src={data[0].img}
                alt=""
              />

              <div className="absolute top-4 -left-8 flex w-10 rotate-[-45deg] justify-center bg-green-700 px-16 py-2 text-center text-xs font-bold text-white shadow-md">
                New
              </div>
              <div className="absolute top-[230px] pl-2 text-[17px] font-semibold text-[#11e3fb]">
                {data[0].pubDate}
              </div>
              <p className="absolute top-[260px] ml-2 font-['Montserrat'] text-[22px] leading-normal font-semibold text-white">
                {data[0].title}
              </p>
            </a>
          </div>
        </div>
        {/* small card  */}
        <div className="mb-[40px] flex max-h-[480px] w-[min(70vw,1250px)] flex-wrap justify-center gap-[25px] overflow-y-auto rounded-[2.5vw] px-[1px] pt-[3px] pb-[6px] max-[800px]:max-h-none max-[800px]:w-[21rem] max-[800px]:px-[12px] max-[800px]:pt-0 max-[800px]:pb-0 max-[550px]:w-[19rem] max-[550px]:pt-[10px]">
          {cards.slice(1)}
        </div>
      </div>
    </div>
  );
};

export default Articles;
