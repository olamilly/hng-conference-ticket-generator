import { ArrowRight } from "lucide-react";
import React from "react";

const Header = () => {
	return (
		<header className="flex items-center justify-between border-2 rounded-[2rem] border-[#197686] m-3 p-4 ">
			<img src="/header-logo.svg" className="pe-3" alt="logo" />
			<div className="flex items-center gap-8 max-sm:hidden">
				<a href="#" className="jeju text-white hover:opacity-80">
					Events
				</a>
				<a href="#" className="jeju text-[#B3B3B3] hover:opacity-80">
					My Tickets
				</a>
				<a href="#" className="jeju text-[#B3B3B3] hover:opacity-80">
					About Project
				</a>
			</div>
			<button className="px-4  h-[45px] bg-white text-[#02191d] rounded-md hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
				<span className="jeju text-[0.9rem]">MY TICKETS</span>{" "}
				<ArrowRight size={17} strokeWidth={1} />
			</button>
		</header>
	);
};

export default Header;
