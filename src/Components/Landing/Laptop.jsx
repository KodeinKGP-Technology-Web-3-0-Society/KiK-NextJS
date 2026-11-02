import Terminal from "./Terminal";

// Flat MacBook-style frame around the PDS terminal.
export default function Laptop() {
  return (
    <div className="mx-auto w-full max-w-[520px]">
      {/* lid */}
      <div className="rounded-t-[18px] border border-[#3a4258] bg-[#1b1f2a] p-3 pb-4 md:p-4 md:pb-5">
        <div className="relative">
          <span className="absolute -top-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#3a4258] md:-top-2.5" />
          <Terminal />
        </div>
      </div>
      {/* base */}
      <div className="relative -mx-[2%] h-3.5 rounded-b-[14px] border-x border-b border-[#9aa1b2] bg-[#c3c8d3] sm:-mx-[6%] md:h-4">
        <span className="absolute top-0 left-1/2 h-1.5 w-[18%] -translate-x-1/2 rounded-b-md bg-[#9aa1b2]" />
      </div>
    </div>
  );
}
