import { useEffect, useState } from "react";
function Ticket(props) {
	const [ticketLevel, setticketLevel] = useState(null);
	const [userData, setUserData] = useState(null);
	const [image, setImage] = useState(null);
	useEffect(() => {
		const savedLevel = localStorage.getItem("level");
		const savedUserData = localStorage.getItem("form");
		setticketLevel(savedLevel);

		const userDataObject = JSON.parse(savedUserData);
		getImagefromCloudinary(userDataObject.avatar);
		setUserData(userDataObject);
	}, []);

	const getImagefromCloudinary = async (imageUrl) => {
		let imageUrlFetched = await fetch(imageUrl);
		let blob = await imageUrlFetched.blob();
		let fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
		let file = new File([blob], fileName, { type: blob.type });
		setImage(URL.createObjectURL(file));
	};

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
								src={image}
								alt="User"
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

	// return (
	// 	<div className="w-full">
	// 		<svg
	// 			width="100%"
	// 			height="100%"
	// 			viewBox="0 0 464 165"
	// 			fill="none"
	// 			xmlns="http://www.w3.org/2000/svg"
	// 			preserveAspectRatio="xMidYMid meet"
	// 		>
	// 			<path
	// 				fill-rule="evenodd"
	// 				clip-rule="evenodd"
	// 				d="M390 0H16C7.16344 0 0 7.16345 0 16V149C0 157.837 7.16345 165 16 165H391C390.448 165 390 164.552 390 164C390 163.448 390.448 163 391 163H395C395.552 163 396 163.448 396 164C396 164.552 395.552 165 395 165H448C456.837 165 464 157.837 464 149V16C464 7.16344 456.837 0 448 0H396C396 0.552285 395.552 1 395 1H391C390.448 1 390 0.552285 390 0ZM390 4C390 3.44772 390.448 3 391 3H395C395.552 3 396 3.44772 396 4C396 4.55228 395.552 5 395 5H391C390.448 5 390 4.55228 390 4ZM391 7C390.448 7 390 7.44772 390 8C390 8.55229 390.448 9 391 9H395C395.552 9 396 8.55229 396 8C396 7.44772 395.552 7 395 7H391ZM390 12C390 11.4477 390.448 11 391 11H395C395.552 11 396 11.4477 396 12C396 12.5523 395.552 13 395 13H391C390.448 13 390 12.5523 390 12ZM391 15C390.448 15 390 15.4477 390 16C390 16.5523 390.448 17 391 17H395C395.552 17 396 16.5523 396 16C396 15.4477 395.552 15 395 15H391ZM390 20C390 19.4477 390.448 19 391 19H395C395.552 19 396 19.4477 396 20C396 20.5523 395.552 21 395 21H391C390.448 21 390 20.5523 390 20ZM391 23C390.448 23 390 23.4477 390 24C390 24.5523 390.448 25 391 25H395C395.552 25 396 24.5523 396 24C396 23.4477 395.552 23 395 23H391ZM390 28C390 27.4477 390.448 27 391 27H395C395.552 27 396 27.4477 396 28C396 28.5523 395.552 29 395 29H391C390.448 29 390 28.5523 390 28ZM391 31C390.448 31 390 31.4477 390 32C390 32.5523 390.448 33 391 33H395C395.552 33 396 32.5523 396 32C396 31.4477 395.552 31 395 31H391ZM390 36C390 35.4477 390.448 35 391 35H395C395.552 35 396 35.4477 396 36C396 36.5523 395.552 37 395 37H391C390.448 37 390 36.5523 390 36ZM391 39C390.448 39 390 39.4477 390 40C390 40.5523 390.448 41 391 41H395C395.552 41 396 40.5523 396 40C396 39.4477 395.552 39 395 39H391ZM390 44C390 43.4477 390.448 43 391 43H395C395.552 43 396 43.4477 396 44C396 44.5523 395.552 45 395 45H391C390.448 45 390 44.5523 390 44ZM391 47C390.448 47 390 47.4477 390 48C390 48.5523 390.448 49 391 49H395C395.552 49 396 48.5523 396 48C396 47.4477 395.552 47 395 47H391ZM390 52C390 51.4477 390.448 51 391 51H395C395.552 51 396 51.4477 396 52C396 52.5523 395.552 53 395 53H391C390.448 53 390 52.5523 390 52ZM391 55C390.448 55 390 55.4477 390 56C390 56.5523 390.448 57 391 57H395C395.552 57 396 56.5523 396 56C396 55.4477 395.552 55 395 55H391ZM390 60C390 59.4477 390.448 59 391 59H395C395.552 59 396 59.4477 396 60C396 60.5523 395.552 61 395 61H391C390.448 61 390 60.5523 390 60ZM391 63C390.448 63 390 63.4477 390 64C390 64.5523 390.448 65 391 65H395C395.552 65 396 64.5523 396 64C396 63.4477 395.552 63 395 63H391ZM390 68C390 67.4477 390.448 67 391 67H395C395.552 67 396 67.4477 396 68C396 68.5523 395.552 69 395 69H391C390.448 69 390 68.5523 390 68ZM391 71C390.448 71 390 71.4477 390 72C390 72.5523 390.448 73 391 73H395C395.552 73 396 72.5523 396 72C396 71.4477 395.552 71 395 71H391ZM390 76C390 75.4477 390.448 75 391 75H395C395.552 75 396 75.4477 396 76C396 76.5523 395.552 77 395 77H391C390.448 77 390 76.5523 390 76ZM391 79C390.448 79 390 79.4477 390 80C390 80.5523 390.448 81 391 81H395C395.552 81 396 80.5523 396 80C396 79.4477 395.552 79 395 79H391ZM390 84C390 83.4477 390.448 83 391 83H395C395.552 83 396 83.4477 396 84C396 84.5523 395.552 85 395 85H391C390.448 85 390 84.5523 390 84ZM391 87C390.448 87 390 87.4477 390 88C390 88.5523 390.448 89 391 89H395C395.552 89 396 88.5523 396 88C396 87.4477 395.552 87 395 87H391ZM390 92C390 91.4477 390.448 91 391 91H395C395.552 91 396 91.4477 396 92C396 92.5523 395.552 93 395 93H391C390.448 93 390 92.5523 390 92ZM391 95C390.448 95 390 95.4477 390 96C390 96.5523 390.448 97 391 97H395C395.552 97 396 96.5523 396 96C396 95.4477 395.552 95 395 95H391ZM390 100C390 99.4477 390.448 99 391 99H395C395.552 99 396 99.4477 396 100C396 100.552 395.552 101 395 101H391C390.448 101 390 100.552 390 100ZM391 103C390.448 103 390 103.448 390 104C390 104.552 390.448 105 391 105H395C395.552 105 396 104.552 396 104C396 103.448 395.552 103 395 103H391ZM390 108C390 107.448 390.448 107 391 107H395C395.552 107 396 107.448 396 108C396 108.552 395.552 109 395 109H391C390.448 109 390 108.552 390 108ZM391 111C390.448 111 390 111.448 390 112C390 112.552 390.448 113 391 113H395C395.552 113 396 112.552 396 112C396 111.448 395.552 111 395 111H391ZM390 116C390 115.448 390.448 115 391 115H395C395.552 115 396 115.448 396 116C396 116.552 395.552 117 395 117H391C390.448 117 390 116.552 390 116ZM391 119C390.448 119 390 119.448 390 120C390 120.552 390.448 121 391 121H395C395.552 121 396 120.552 396 120C396 119.448 395.552 119 395 119H391ZM390 124C390 123.448 390.448 123 391 123H395C395.552 123 396 123.448 396 124C396 124.552 395.552 125 395 125H391C390.448 125 390 124.552 390 124ZM391 127C390.448 127 390 127.448 390 128C390 128.552 390.448 129 391 129H395C395.552 129 396 128.552 396 128C396 127.448 395.552 127 395 127H391ZM390 132C390 131.448 390.448 131 391 131H395C395.552 131 396 131.448 396 132C396 132.552 395.552 133 395 133H391C390.448 133 390 132.552 390 132ZM391 135C390.448 135 390 135.448 390 136C390 136.552 390.448 137 391 137H395C395.552 137 396 136.552 396 136C396 135.448 395.552 135 395 135H391ZM390 140C390 139.448 390.448 139 391 139H395C395.552 139 396 139.448 396 140C396 140.552 395.552 141 395 141H391C390.448 141 390 140.552 390 140ZM391 143C390.448 143 390 143.448 390 144C390 144.552 390.448 145 391 145H395C395.552 145 396 144.552 396 144C396 143.448 395.552 143 395 143H391ZM390 148C390 147.448 390.448 147 391 147H395C395.552 147 396 147.448 396 148C396 148.552 395.552 149 395 149H391C390.448 149 390 148.552 390 148ZM391 151C390.448 151 390 151.448 390 152C390 152.552 390.448 153 391 153H395C395.552 153 396 152.552 396 152C396 151.448 395.552 151 395 151H391ZM390 156C390 155.448 390.448 155 391 155H395C395.552 155 396 155.448 396 156C396 156.552 395.552 157 395 157H391C390.448 157 390 156.552 390 156ZM391 159C390.448 159 390 159.448 390 160C390 160.552 390.448 161 391 161H395C395.552 161 396 160.552 396 160C396 159.448 395.552 159 395 159H391Z"
	// 				fill="#D9D9D9"
	// 			/>
	// 			<path
	// 				d="M398 6C398 3.79086 399.791 2 402 2H448C455.732 2 462 8.26801 462 16V149C462 156.732 455.732 163 448 163H402C399.791 163 398 161.209 398 159V6Z"
	// 				fill="#0E464F"
	// 			/>
	// 			<path
	// 				d="M2 16C2 8.26801 8.26801 2 16 2H384C386.209 2 388 3.79086 388 6V159C388 161.209 386.209 163 384 163H16C8.26801 163 2 156.732 2 149V16Z"
	// 				fill="#0E464F"
	// 			/>
	// 			<text x="100" y="50" font-size="20" font-family="Arial" fill="black">
	// 				Your Text Here
	// 			</text>
	// 			<g filter="url(#filter0_d_11_797)">
	// 				<rect
	// 					x="10"
	// 					y="12"
	// 					width="120.375"
	// 					height="117"
	// 					rx="5.625"
	// 					fill="#D9D9D9"
	// 					id=""
	// 				/>
	// 				{userData && (
	// 					<image
	// 						x="10"
	// 						y="12"
	// 						width="120.375"
	// 						height="117"
	// 						href={userData.avatar}
	// 						preserveAspectRatio="xMidYMid slice"
	// 					/>
	// 				)}
	// 				<rect
	// 					x="8.875"
	// 					y="10.875"
	// 					width="122.625"
	// 					height="119.25"
	// 					rx="6.75"
	// 					stroke="#0E464F"
	// 					stroke-width="2.25"
	// 				/>
	// 			</g>
	// 			<defs>
	// 				<filter
	// 					id="filter0_d_11_797"
	// 					x="3.25"
	// 					y="9.75"
	// 					width="133.875"
	// 					height="135"
	// 					filterUnits="userSpaceOnUse"
	// 					color-interpolation-filters="sRGB"
	// 				>
	// 					<feFlood flood-opacity="0" result="BackgroundImageFix" />
	// 					<feColorMatrix
	// 						in="SourceAlpha"
	// 						type="matrix"
	// 						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
	// 						result="hardAlpha"
	// 					/>
	// 					<feOffset dy="9" />
	// 					<feGaussianBlur stdDeviation="2.25" />
	// 					<feComposite in2="hardAlpha" operator="out" />
	// 					<feColorMatrix
	// 						type="matrix"
	// 						values="0 0 0 0 0.125244 0 0 0 0 0.120007 0 0 0 0 0.120007 0 0 0 0.25 0"
	// 					/>
	// 					<feBlend
	// 						mode="normal"
	// 						in2="BackgroundImageFix"
	// 						result="effect1_dropShadow_11_797"
	// 					/>
	// 					<feBlend
	// 						mode="normal"
	// 						in="SourceGraphic"
	// 						in2="effect1_dropShadow_11_797"
	// 						result="shape"
	// 					/>
	// 				</filter>
	// 			</defs>
	// 		</svg>
	// 	</div>
	// );
}

export default Ticket;
