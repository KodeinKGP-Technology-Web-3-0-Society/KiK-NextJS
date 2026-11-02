import Head from "../../data/teams/Heads.json";
import MemberCard from "./MemberCard";

const Heads = () => (
  <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
    {Head.map((head, i) => (
      <MemberCard key={head.name} index={i} {...head} />
    ))}
  </div>
);

export default Heads;
