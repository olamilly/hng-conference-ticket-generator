import { useState, useEffect } from "react";

function TicketSelection(props) {
	const [selectedTicket, setSelectedTicket] = useState("regular");
	const [quantity, setQuantity] = useState("1");
	useEffect(() => {
		const level = localStorage.getItem("level");
		const q = localStorage.getItem("quantity");
		if (level) {
			setSelectedTicket(level);
		} else {
			saveLevel("regular");
		}
		if (q) {
			setQuantity(q);
		} else {
			saveQuantity("1");
		}
	}, []);

	const saveLevel = (value) => {
		setSelectedTicket(value);
		localStorage.setItem("level", value);
	};

	const saveQuantity = (value) => {
		setQuantity(value);
		localStorage.setItem("quantity", value);
	};
	return (
		<>
			{/* Event Details Card */}
			<div className="details-header border-2 border-[#0E464F] rounded-[1.4rem] p-6 space-y-4 mb-8">
				<h2 className="road-rage max-[360px]:text-[2rem] text-[3.5rem] text-center text-white">
					Techtember Fest '25
				</h2>
				<p className="text-center text-white">
					Join us for an unforgettable experience at Techtember Fest! Secure
					your spot now.
				</p>
				<div className="flex max-md:flex-col items-center flex-wrap justify-center gap-2 text-white">
					<span className="text-center">📍Eko Hotels and Suites</span>
					<span className="px-2 max-md:hidden">||</span>
					<span className="text-center">March 15, 2025 | 7:00 PM</span>
				</div>
			</div>

			<div className="border-2 border-[#0E464F] mb-8"></div>

			{/* Ticket Selection */}

			<h3 className="text-white">Select Ticket Type:</h3>
			<div className="space-y-6 my-5 bg-[#052228] border-2 border-[#0E464F] rounded-[1.4rem] p-[1rem]">
				<div className="flex flex-wrap md:flex-nowrap items-center justify-evenly gap-4">
					{/* Regular Access */}
					<div
						className={`bg-[#0e464f] w-full md:w-1/2 p-4 rounded-lg cursor-pointer transition-colors ${
							selectedTicket === "regular" ? "ring-2 ring-[#24a0b5]" : ""
						}`}
						onClick={() => saveLevel("regular")}
					>
						<div className="flex justify-between gap-2 max-[345px]:flex-wrap items-center">
							<div>
								<h4 className="text-white">REGULAR ACCESS</h4>
								<p className="text-sm text-[#24a0b5]">20 left!</p>
							</div>
							<button className="px-4 py-2 border border-[#24a0b5] text-white rounded-md hover:bg-[#041e23] transition-colors">
								Free
							</button>
						</div>
					</div>

					{/* VIP Access */}
					<div
						className={`bg-[#0e464f] w-full md:w-1/2 p-4 rounded-lg cursor-pointer transition-colors ${
							selectedTicket === "vip" ? "ring-2 ring-[#24a0b5]" : ""
						}`}
						onClick={() => saveLevel("vip")}
					>
						<div className="flex justify-between gap-2 max-[345px]:flex-wrap items-center">
							<div>
								<h4 className="text-white">VIP ACCESS</h4>
								<p className="text-sm text-[#24a0b5]">20 left!</p>
							</div>
							<button className="px-4 py-2 border border-[#24a0b5] text-white rounded-md hover:bg-[#041e23] transition-colors">
								$50
							</button>
						</div>
					</div>
				</div>

				<div className="flex flex-wrap md:flex-nowrap items-center justify-evenly gap-4 mt-4">
					{/* VVIP Access */}
					<div
						className={`bg-[#0e464f] w-full p-4 rounded-lg cursor-pointer transition-colors ${
							selectedTicket === "vvip" ? "ring-2 ring-[#24a0b5]" : ""
						}`}
						onClick={() => saveLevel("vvip")}
					>
						<div className="flex justify-between max-[345px]:flex-wrap gap-2 items-center">
							<div>
								<h4 className="text-white">VVIP ACCESS</h4>
								<p className="text-sm text-[#24a0b5]">20 left!</p>
							</div>
							<button className="px-4 py-2 border border-[#24a0b5] text-white rounded-md hover:bg-[#041e23] transition-colors">
								$150
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="space-y-2">
				<label htmlFor="quantity" className="text-white block">
					Number of Tickets
				</label>
				<select
					id="quantity"
					value={quantity}
					onChange={(e) => saveQuantity(e.target.value)}
					className="w-full bg-[#0e464f] cursor-pointer text-white rounded-md px-5 py-3 border border-[#0e464f] focus:outline-none focus:ring-2 focus:ring-[#24a0b5]"
				>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
				</select>
			</div>
			<div className="flex items-center justify-center max-md:flex-col-reverse gap-4 mt-6 md:border-2 md:border-[#0E464F] md:rounded-[1.4rem] md:px-7">
				<button className="w-full jeju px-4 py-2 border border-[#24a0b5] text-[#24a0b5] rounded-md hover:bg-[#041e23] transition-colors">
					Cancel
				</button>
				<button
					onClick={() => {
						props.next();
					}}
					className="w-full px-4 py-2 jeju bg-[#24a0b5] text-white rounded-md hover:opacity-90 transition-colors"
				>
					Next
				</button>
			</div>
		</>
	);
}

export default TicketSelection;
