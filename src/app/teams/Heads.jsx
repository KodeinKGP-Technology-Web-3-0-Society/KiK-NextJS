import { Facebook, Instagram, Linkedin, Github, Mail } from 'lucide-react'
import Head from '../../data/teams/Heads.json'

const Heads = () => {
  function eachHead(head) {
    return (
      <article
        key={head.name}
        className="group relative flex w-[280px] flex-col items-center overflow-hidden bg-[#01011b] p-[10px] m-3 
        transition-[0.5s] ease-in before:absolute before:inset-0 before:border-[4px] before:border-[rgb(181,246,253,0.8)] 
        before:content-[''] before:[border-image:linear-gradient(to_bottom_right,rgb(17,227,251),rgb(91,230,255),rgb(181,246,253),rgb(17,227,251))_1] 
        after:absolute after:inset-[5px] after:z-[-5] after:bg-[#01011b] after:content-[''] after:top-[-110%] after:left-[-210%] after:w-[200%] 
        after:h-[200%] after:opacity-0 after:rotate-[30deg] after:bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.2)_77%,
        rgba(255,255,255,0.9)_92%,rgba(255,255,255,0)_100%)] hover:after:opacity-100 active:after:opacity-50 hover:after:top-[-40%] active:after:top-[-40%] 
        hover:after:left-[-40%] active:after:left-[-40%] after:[transition:left_0.7s_ease,top_0.7s_ease,opacity_0.15s_ease] hover:translate-y-[-5px] active:translate-y-[-5px] hover:scale-[1.005] 
        active:scale-[1.005] hover:bg-[rgba(54,54,54,0.6)] active:bg-[rgba(54,54,54,0.6)] hover:shadow-[0px_2px_10px_#3dc4d4] 
        active:shadow-[0px_2px_10px_#3dc4d4] [transform-style:preserve-3d] hover:[transform:translateY(-5px)_scale(1.005)_translateZ(0)] touch-manipulation"
      >
        <div className="relative z-[2] flex w-full flex-col items-center space-y-6 group-hover:[transform:translateZ(20px)]">
          <h4 className="text-[#3dc4d4] font-montserrat text-[1.25rem] p-2 m-0">
            <strong>{head.role}</strong>
          </h4>
          <div className="relative w-full flex flex-col items-center">
            <img
              src={head.image_url}
              alt={head.name}
              className="h-[250px] w-[200px] object-cover"
            />
          </div>

          <div className="w-[60%] flex justify-around gap-4 opacity-0 transition-all duration-300 ease-in-out z-10 group-hover:opacity-100">
            {head.facebook && (
              <a
                href={head.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-[20px] text-[#3dc4d4] hover:text-[#4ff4fd] transition-colors block"
              >
                <Facebook size={20} />
              </a>
            )}
            {head.mailid && (
              <a
                href={`mailto:${head.mailid}`}
                target="_blank"
                rel="noreferrer"
                className="text-[20px] text-[#3dc4d4] hover:text-[#4ff4fd] transition-colors block"
              >
                <Mail size={20} />
              </a>
            )}
            {head.instagram && (
              <a
                href={head.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-[20px] text-[#3dc4d4] hover:text-[#4ff4fd] transition-colors block"
              >
                <Instagram size={20} />
              </a>
            )}
            {head.linkedin && (
              <a
                href={head.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-[20px] text-[#3dc4d4] hover:text-[#4ff4fd] transition-colors block"
              >
                <Linkedin size={20} />
              </a>
            )}
            {head.github && (
              <a
                href={head.github}
                target="_blank"
                rel="noreferrer"
                className="text-[20px] text-[#3dc4d4] hover:text-[#4ff4fd] transition-colors block"
              >
                <Github size={20} />
              </a>
            )}
          </div>
          <h5 className="font-montserrat text-[1.25rem] text-white m-0">
            <strong className='p-2'>{head.name}</strong>
          </h5>
        </div>
      </article>
    )
  }

return (
  <div className="flex w-[95%] max-w-[1400px] flex-wrap items-center justify-around gap-8">
    {Head.map(eachHead)}
  </div>
)
}

export default Heads