import Founders from './Founders'
import Heads from './Heads.jsx'
import OldHeads from './OldHeads.jsx'


const Page = () => {
	return (
		

		<div className="min-h-screen bg-[#01011b] text-center text-white font-montserrat py-8">
			<div className="grid grid-cols-1 gap-20 items-center justify-items-center">
				<div className="grid grid-cols-1 items-center justify-items-center w-full">
					<h3 className="text-[#3dc4d4] text-[2.5rem]"><strong>Heads</strong></h3>
					<div className="mt-6 w-full flex justify-center">
						<Heads />
					</div>
				</div>
				<div className="grid grid-cols-1 items-center justify-items-center w-full">
					<h3 className="text-[#3dc4d4] text-[2.5rem]"><strong>Founders</strong></h3>
					<div className="mt-6 w-full flex justify-center">
						<Founders />
					</div>
				</div>
				<div className="grid grid-cols-1 items-center justify-items-center w-full">
					<h3 className="text-[#3dc4d4] text-[2.5rem]"><strong>Advisors</strong></h3>
					<div className="mt-6 w-full flex justify-center">
						<OldHeads />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page