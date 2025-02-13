import Ticket from "./Ticket";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

function TicketReady(props) {
	const ticketRef = useRef(null);
	const downloadTicket = async (orientation) => {
		const element = document.querySelector(".ticket");

		if (!element) {
			return;
		}

		// Convert the HTML element to a canvas
		const canvas = await html2canvas(element);

		// Convert the canvas to an image
		const imgData = canvas.toDataURL("image/png");
		if (orientation == "landscape") {
			// Create a PDF and add the image to it
			const pdf = new jsPDF("landscape", "mm", "a6");
			const imgWidth = 148;
			const imgHeight = (canvas.height * imgWidth) / canvas.width;
			const pageHeight = 105;
			const yPosition = (pageHeight - imgHeight) / 2;
			pdf.addImage(canvas, "PNG", 0, yPosition, imgWidth, imgHeight);
			pdf.save("techtember-fest-25.pdf");
		} else {
			const pdf = new jsPDF("p", "mm", "a6");
			const imgWidth = 105;
			const imgHeight = (canvas.height * imgWidth) / canvas.width - 7;
			const pageWidth = 105;
			const pageHeight = 148;
			const xPosition = (pageWidth - imgWidth) / 2; // Center horizontally
			const yPosition = (pageHeight - imgHeight) / 2; // Center vertically

			pdf.addImage(imgData, "PNG", xPosition, yPosition, imgWidth, imgHeight);
			pdf.save("techtember-fest-25.pdf");
		}
	};
	return (
		<div>
			<ArrowLeft
				className="text-white cursor-pointer"
				onClick={() => {
					props.back();
				}}
			/>
			<h1 className="text-center text-white font-semibold text-[2rem]">
				Your Ticket is Booked!
			</h1>
			<h1 className="text-center text-white mb-6">
				You can download or check your email for a copy
			</h1>
			<Ticket ref={ticketRef} />
			{/* Action Buttons */}
			<div className="flex items-center justify-center max-md:flex-col-reverse gap-4 mt-6 md:border-2 md:border-[#0E464F] md:rounded-[1.4rem] md:px-7">
				<button
					onClick={() => {
						props.restart();
					}}
					className="w-full jeju px-4 py-2 border border-[#24a0b5] text-[#24a0b5] rounded-md hover:bg-[#041e23] transition-colors"
				>
					Generate Another Ticket
				</button>

				<button
					onClick={() => {
						downloadTicket("landscape");
					}}
					className="w-full max-sm:hidden px-4 py-2 jeju bg-[#24a0b5] text-white rounded-md hover:opacity-90 transition-colors"
				>
					Download Ticket
				</button>
				<button
					onClick={() => {
						downloadTicket("portrait");
					}}
					className="w-full sm:hidden px-4 py-2 jeju bg-[#24a0b5] text-white rounded-md hover:opacity-90 transition-colors"
				>
					Download Ticket
				</button>
			</div>
		</div>
	);
}

export default TicketReady;
