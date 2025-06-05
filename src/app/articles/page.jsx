import React from 'react'
import LottieWrapper from './LottieWrapper'
import data from '../../data/articles/articles-list.json'
import RibbonWrapper from './RibbonWrapper'


const Articles = () => {
    const cards = data.map((info, index) => (
        <div key={index} className="">
            <a
                className=" flex w-[min(31vw,550px)] h-[140px] bg-[rgba(54,54,54,0.4)] relative rounded-[2.5vw] border-4 border-transparent overflow-hidden xl:w-[min(31vw,550px)] max-[1300px]:w-[50vw] max-[800px]:w-full max-[800px]:h-[420px] max-[800px]:block max-[800px]:justify-center  max-[550px]:w-[17.5rem] max-[550px]:h-[380px] max-[550px]:rounded-[5vw] hover:bg-[#39394080] hover:border-[#3dc4d4] hover:shadow-[0_0_12px_#3dc4d4] transition duration-150"
                href={info.link}
                target="_blank"
            >
                <img
                    src={info.img}
                    alt=""
                    className="w-[150px] h-full self-center relative max-[800px]:w-full max-[800px]:h-[45%]  max-[550px]:h-[50%]"
                />
                <div className="w-[65%] ml-[10px] flex flex-col justify-center gap-[10px] px-2">
                    <p className="absolute top-[15px] text-[#11e3fb] text-[13px] leading-[22px] font-semibold not-italic z-10 max-[1300px]:text-[15px] max-[800px]:text-[17px] max-[800px]:top-[230px] max-[550px]:text-[13px] max-[550px]:top-[200px]">
                        {info.pubDate}
                    </p>
                    <p className="absolute top-[40px] pr-[15px] text-white text-[17px] leading-[28px] font-['Montserrat'] not-italic z-10 max-[800px]:text-[22px] max-[800px]:leading-normal max-[800px]:w-full max-[800px]:top-[260px] max-[800px]:pr-[30px] max-[550px]:text-[19px] max-[550px]:top-[230px] font-semibold">
                        {info.title}
                    </p>
                </div>
            </a>
        </div>
    ))
    return (
        <div className="flex flex-col">
            {/* article heading  */}
            <div className="flex mb-0 max-[1300px]:mb-20 flex-row max-[800px]:flex-col">
                <div className="flex justify-between self-center flex-col w-[55vw] max-[800px]:w-[90vw] ">
                    <div className="font-semibold ml-[2.5vw] font-['Arial]
					text-[4rem] sm:text-[6rem] lg:text-[7rem] xl:text-[8rem] 
					leading-[100px] sm:leading-[120px] 
					pl-0 md:pl-[3rem] 
					flex self-center tracking-[0.1rem]
					bg-gradient-to-r from-[#11e3fb] via-[#b5f6fd] to-[#5be6ff] 
					text-transparent bg-clip-text [background-size:300%_auto] [background-position:0%_50%] animate-gradient-shift">
                        Articles
                    </div>
                    <div className="text-white self-start font-['Montserrat'] pl-24 mt-14 max-[800px]:pl-12 max-[500px]:pl-0 max-[500px]:mt-6 max-[500px]:text-center">
                        <h2 className="font-light text-[2rem] mb-4 leading-tight max-[1300px]:text-[1.8rem] max-[550px]:text-[1.2rem]">Your Gateway to AI, Web Dev, and Blockchain</h2>
                        <h3 className='font-thin text-2xl max-[1300px]:text-[1.2rem] max-[550px]:text-[1rem]'>
                            Explore cutting-edge trends and insights shaping the future of
                            technology.
                        </h3>
                    </div>
                </div>
                <div className="w-[35vw] self-start max-[800px]:self-center max-[800px]:w-[50vw] max-[550px]:w-[70vw] ">
                    <LottieWrapper />
                </div>
            </div>

            {/* article card  */}
            <div className="flex gap-[2vw] w-[95vw] self-center justify-center max-[800px]:items-center max-[800px]:flex-col max-[550px]:overflow-x-hidden">
                {/* big card  */}
                <div className="relative">
                    <div className="min-w-[330px] max-w-[420px] w-[25vw] h-[475px]  rounded-[2.5vw] px-3 pt-0.5">
                        <a
                            className="block w-full h-full relative rounded-[2.5vw] group bg-[#39394080]  hover:border-4 hover:border-[#3dc4d4] hover:shadow-[0_0_12px_#3dc4d4] transition-all duration-150 overflow-hidden"
                            href={data[0].link}
                            target="_blank"
                        >
                            <img
                                className="w-full h-[45%] relative"
                                src={data[0].img}
                                alt=""
                            />

                            <RibbonWrapper
                                side="left"
                                type="corner"
                                size="large"
                                backgroundColor="green"
                                color="white"
                                fontFamily="Arial"
                                withStripes={false}
                            >
                                <p className="font-bold">New</p>
                            </RibbonWrapper>
                            <div className="absolute top-[230px] text-[#11e3fb] font-semibold text-[17px] pl-2">
                                {data[0].pubDate}
                            </div>
                            <p className="absolute top-[260px] ml-2 text-white font-['Montserrat'] text-[22px] leading-normal font-semibold">
                                {data[0].title}
                            </p>
                        </a>
                    </div>
                </div>
                {/* small card  */}
                <div className="flex flex-wrap gap-[25px] w-[min(70vw,1250px)] max-h-[480px] overflow-y-auto rounded-[2.5vw] px-[1px] pt-[3px] pb-[6px] justify-center mb-[40px] max-[800px]:w-[21rem] max-[800px]:max-h-none max-[800px]:px-[12px] max-[800px]:pt-0 max-[800px]:pb-0 max-[550px]:w-[19rem] max-[550px]:pt-[10px]">
                    {cards.slice(1)}
                </div>

            </div>

        </div>
    )
}

export default Articles;
