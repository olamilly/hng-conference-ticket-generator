import { useEffect, useState } from "react";
function Ticket(props) {
	const [ticketLevel, setticketLevel] = useState(null);
	const [userData, setUserData] = useState(null);
	useEffect(() => {
		const savedLevel = localStorage.getItem("level");
		const savedUserData = localStorage.getItem("form");
		setticketLevel(savedLevel);

		const userDataObject = JSON.parse(savedUserData);
		setUserData(userDataObject);
	}, []);

	return (
		userData &&
		ticketLevel && (
			<div className="ticket max-sm:max-w-[236px] max-w-[500px] mx-auto p-1 ">
				<div className="bg-[#004d4d] relative max-sm:flex text-white rounded-lg border-2 border-[#D9D9D9] shadow-md overflow-hidden">
					<h1 className="absolute top-1/2 rotate-20 sm:left-1/3 left-1/6 text-white/20 road-rage text-[3.5rem]">
						Techtember Fest 2025
					</h1>
					<div className="flex max-sm:flex-col max-sm:w-full max-sm:items-center">
						{/* Left section with user image */}
						<div className="relative w-40 max-sm:my-2 sm:me-2 ">
							<img
								src={userData.avatar}
								alt="User Image"
								className="w-full h-full object-cover"
								crossOrigin="anonymous"
							/>
							<div className="absolute bottom-0 bg-opacity-20 left-0 right-0 text-white p-0.5 text-center">
								<span className="text-[23px]  jeju font-medium">
									{userData.fullName}
								</span>
							</div>
						</div>

						<div className="flex-1 flex max-sm:flex-col max-sm:w-full">
							<div className="grow-1 flex flex-col max-sm:items-center justify-between">
								<h1 className="text-[2rem] road-rage font-bold mb-1 font-serif tracking-wide leading-tight">
									Techtember Fest "25
								</h1>
								<div className="space-y-0.5">
									<p className="flex items-center gap-1 text-sm">
										<span className="text-sm">📍</span> Eko Hotels and Suites
									</p>
									<p className="flex items-center gap-1 text-sm">
										<span className="text-sm">📅</span> March 15, 2025 | 7:00pm
									</p>
								</div>
								<p className="text-[10px] my-2 jeju text-white">
									Ticket for 1 entry only
								</p>
							</div>

							<div className="flex justify-between items-center max-sm:flex-row flex-col p-1 max-sm:border-t sm:border-s border-dashed border-[#D9D9D9]">
								{ticketLevel == "regular" ? (
									<img src="/Reg.svg" alt="Ticket level" />
								) : ticketLevel == "vip" ? (
									<img src="/VIP.svg" alt="Ticket level" />
								) : (
									<img src="/VVIP.svg" alt="Ticket level" />
								)}
								<div className="bg-[#d4c5a9] z-2 text-black px-2 py-1 rounded text-sm font-bold">
									0035
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
}

export default Ticket;
