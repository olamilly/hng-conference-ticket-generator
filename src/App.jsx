import { useState, useEffect } from "react";
import Header from "./components/Header";
import TicketSelection from "./components/TicketSelection";
import AttendeeDetails from "./components/AttendeeDetails";
import TicketReady from "./components/TicketReady";

export default function App() {
	const [step, setStep] = useState(1);

	useEffect(() => {
		const savedStep = localStorage.getItem("step");
		if (savedStep) {
			setStep(Number(savedStep));
		} else {
			updateStep(1);
		}
	}, []);
	const updateStep = (value) => {
		setStep(value);
		localStorage.setItem("step", value);
	};

	return (
		<div className="min-h-screen bg-[#02191d]">
			{/* Navigation */}
			<nav className="p-3">
				<Header />
			</nav>

			{/* Main Content */}
			<main className="container mx-auto px-4 py-8">
				<div className="max-w-3xl mx-auto bg-[#041E23] border-2 rounded-[2rem] border-[#0E464F] p-6">
					{/* Header */}
					<div className="space-y-2 mb-6">
						<div className="flex justify-between items-center">
							{(() => {
								switch (step) {
									case 1:
										return (
											<h1 className="text-[2.7rem] jeju text-white font-semibold">
												Ticket Selection
											</h1>
										);
									case 2:
										return (
											<h1 className="text-[2.7rem] jeju text-white font-semibold">
												Attendee Details
											</h1>
										);
									case 3:
										return (
											<h1 className="text-[2.7rem] jeju text-white font-semibold">
												Ready
											</h1>
										);
									default:
										return <h1>Step {step}</h1>;
								}
							})()}

							<span className="text-white">Step {step}/3</span>
						</div>
						<div className="h-1 bg-[#0e464f] rounded-full">
							<div
								className={
									step == 1
										? "w-1/3 h-full bg-[#24a0b5] rounded-full"
										: step == 2
										? "w-2/3 h-full bg-[#24a0b5] rounded-full"
										: "w-full h-full bg-[#24a0b5] rounded-full"
								}
							></div>
						</div>
					</div>
					<div className="border-2 rounded-[2rem] border-[#0E464F] p-[1.4rem] bg-[#08252B]">
						{step == 1 ? (
							<TicketSelection
								next={() => {
									updateStep(step + 1);
								}}
							/>
						) : step == 2 ? (
							<AttendeeDetails
								next={() => {
									updateStep(step + 1);
								}}
								back={() => {
									updateStep(step - 1);
								}}
							/>
						) : (
							<TicketReady
								restart={() => {
									updateStep(1);
								}}
								back={() => {
									updateStep(step - 1);
								}}
							/>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}
