import Founders from "./Founders";
import Heads from "./Heads.jsx";
import OldHeads from "./OldHeads.jsx";

export const metadata = {
  title: "KodeinKGP",
  description: "KodeinKGP Teams Page",
  image: "/KIK_logo-removebg.png",
};

const Page = () => {
  return (
    <div className="font-montserrat min-h-screen bg-[#01011b] py-8 text-center text-white">
      <div className="grid grid-cols-1 items-center justify-items-center gap-20">
        <div className="grid w-full grid-cols-1 items-center justify-items-center">
          <h3 className="text-[2.5rem] text-[#3dc4d4]">
            <strong>Heads</strong>
          </h3>
          <div className="mt-6 flex w-full justify-center">
            <Heads />
          </div>
        </div>
        <div className="grid w-full grid-cols-1 items-center justify-items-center">
          <h3 className="text-[2.5rem] text-[#3dc4d4]">
            <strong>Founders</strong>
          </h3>
          <div className="mt-6 flex w-full justify-center">
            <Founders />
          </div>
        </div>
        <div className="grid w-full grid-cols-1 items-center justify-items-center">
          <h3 className="text-[2.5rem] text-[#3dc4d4]">
            <strong>Advisors</strong>
          </h3>
          <div className="mt-6 flex w-full justify-center">
            <OldHeads />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
