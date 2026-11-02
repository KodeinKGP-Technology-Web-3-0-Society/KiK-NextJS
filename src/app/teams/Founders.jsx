import MemberCard from "./MemberCard";

const FOUNDERS = [
  {
    name: "Suraj Gupta",
    role: "Founder",
    image_url: "https://user-images.githubusercontent.com/96824839/171794126-16b6182a-65f3-483b-95f1-04682526a6ca.jpg",
    facebook: "https://www.facebook.com/profile.php?id=100057206746965",
    mailid: "surajgupta.3072@gmail.com",
    linkedin: "https://www.linkedin.com/in/suraj-gupta-457496201/",
    github: "https://github.com/surajgupta3072/",
  },
  {
    name: "Bhushan Nakade",
    role: "Founder",
    image_url: "https://user-images.githubusercontent.com/93533913/190714232-3f1ff3ee-92f4-4d8c-93f9-79426951a130.png",
    facebook: "https://www.facebook.com/bhushan.nakade.984",
    mailid: "bhushantny1@gmail.com",
    instagram: "https://www.instagram.com/_.bhushan._/",
    linkedin: "https://www.linkedin.com/in/bhushan-nakade-141971209/",
    github: "https://github.com/imshresth0810",
  },
];

const Founders = () => (
  <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
    {FOUNDERS.map((f, i) => (
      <MemberCard key={f.name} index={i} {...f} />
    ))}
  </div>
);

export default Founders;
