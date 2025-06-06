import data from "../../data/events/EventsData.json";
import Image from "next/image";

const page = () => {
  return (
    <div className="min-h-screen bg-[#01011b]">
      <section className="hackathon_con"></section>

      <section>
        {data?.map((eventx, index) => (
          <div className="mx-auto flex w-[95%] flex-col" key={index}>
            {/* Event Container */}
            <h2
              className="font-poppins mt-[32px] mb-6 ml-[5px] bg-clip-text text-[48px] font-bold max-lg:ml-4 max-lg:text-[35px]"
              style={{
                marginBottom: index === 0 || index === 5 ? "3.5rem" : "0",
                background: `radial-gradient(64.18% 64.18% at 71.16% 35.69%, 
                            #def9fa 0.89%, #bef3f5 17.23%, #9dedf0 42.04%, 
                            #7de7eb 55.12%, #5ce1e6 71.54%, #33bbcf 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {index === 0
                ? "Previous Hackathons"
                : index === 5
                  ? "Previous Workshops"
                  : null}
            </h2>

            <div
              className={`mr-0 flex gap-8 border-b-[2px] border-white pb-4 max-lg:m-0 max-lg:flex-col max-lg:gap-4 ${
                index % 2 === 0 ? "flex-row-reverse pr-12 max-lg:pr-0" : "mt-4"
              }`}
            >
              {/* Event Image */}
              <div className="relative max-h-[450px] w-[350%] max-lg:mx-auto max-lg:w-[88%]">
                <Image
                  src={eventx.image}
                  alt="event"
                  fill
                  className="rounded-[8px]"
                  sizes="(max-width: 1024px) 100vw, 400px"
                  priority={index < 2}
                />
              </div>
              <div className="event_content">
                <h3 className="font-kanit mx-0 mt-2 mb-4 text-[30px] text-white max-lg:text-[25px]">
                  {eventx.heading}
                </h3>

                <div
                  className={`text-base leading-[30.8px] font-normal text-[#ffffffb3] max-lg:text-[14px] ${
                    index % 2 !== 0 ? "md:mr-20" : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: eventx.description }}
                />

                {Array.isArray(eventx.sponsor) && eventx.sponsor.length > 0 && (
                  <div className="mt-4 flex items-center gap-[20px] max-lg:pr-2">
                    <div className="font-poppins text-[20px] text-white">
                      <h5>Sponsored by:</h5>
                    </div>
                    <div className="flex flex-wrap gap-[10px]">
                      {eventx.sponsor.map((sponsor, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <div className="relative h-[35px] w-[35px]">
                            <Image
                              src={eventx.sponsor_img[i]}
                              alt={sponsor}
                              fill
                              className="rounded-full object-cover"
                              sizes="35px"
                            />
                          </div>
                          <h4 className="mx-[10px] my-0 text-white">
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
        ))}
      </section>
    </div>
  );
};

export default page;
