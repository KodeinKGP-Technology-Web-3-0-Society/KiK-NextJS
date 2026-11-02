import Head from "../../data/teams/OldHeads.json";
import MemberCard from "./MemberCard";

const OldHeads = () => (
  <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
    {Head.map((head, i) => {
      const { role, ...advisorData } = head;
      return <MemberCard key={head.name} index={i} {...advisorData} role="" />;
    })}
  </div>
);

export default OldHeads;
