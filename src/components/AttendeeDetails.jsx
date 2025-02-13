import { useState, useEffect } from "react";
import Loader from "./Loader";
// import { Cloudinary } from "@cloudinary/url-gen";
// import { auto } from "@cloudinary/url-gen/actions/resize";
// import { v2 as cloudinary } from "cloudinary";
function AttendeeDetails(props) {
	const [file, setFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [localImage, setLocalImage] = useState(null);
	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		avatar: "",
	});

	useEffect(() => {
		const savedForm = localStorage.getItem("form");
		if (savedForm) {
			const formObject = JSON.parse(savedForm);
			setFormData(formObject);
			setLocalImage(formObject.avatar);
		} else {
			localStorage.setItem("form", JSON.stringify(formData));
		}
	}, []);

	const uploadToCloudinary = async () => {
		try {
			const img = new FormData();
			img.append("file", file);
			img.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
			img.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
			const response = await fetch(
				`https://api.cloudinary.com/v1_1/${
					import.meta.env.VITE_CLOUD_NAME
				}/image/upload`,
				{ method: "post", body: img }
			);
			const data = await response.json();
			const n = formData;
			n["avatar"] = data.url.toString();
			localStorage.setItem("form", JSON.stringify(n));
		} catch (error) {
			console.error("Error uploading image:", error);
			console.log(error);
			setErrors({ avatar: "Error uploading image. Please try again." });
		}
		setIsLoading(false);
	};

	const handleFileDrop = (e) => {
		e.preventDefault();

		if (e.dataTransfer.files?.[0]) {
			if (e.dataTransfer.files[0].type.includes("image/")) {
				setLocalImage(URL.createObjectURL(e.dataTransfer.files[0]));
				setFile(e.dataTransfer.files[0]);
				setErrors((prevData) => ({
					...prevData,
					avatar: "",
				}));
			} else {
				setErrors((prevData) => ({
					...prevData,
					avatar: "Invalid file type",
				}));
			}
		}
	};

	const handleFileInput = (e) => {
		if (e.target.files?.[0]) {
			if (e.target.files[0].type.includes("image/")) {
				setLocalImage(URL.createObjectURL(e.target.files[0]));
				setFile(e.target.files[0]);
				setErrors((prevData) => ({
					...prevData,
					avatar: "",
				}));
			} else {
				setErrors((prevData) => ({
					...prevData,
					avatar: "Invalid file type",
				}));
			}
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.fullName.trim()) {
			newErrors.fullName = "Full name is required";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}

		if (!localImage) {
			newErrors.avatar = "Image is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		const n = formData;
		n[name] = value;
		localStorage.setItem("form", JSON.stringify(n));
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async () => {
		if (validateForm()) {
			if (file) {
				setIsLoading(true);
				await uploadToCloudinary();
			}
			props.next();
		}
	};

	return (
		<div className="space-y-6">
			{/* File Upload Section */}
			<div className="rounded-lg border border-[#0e464f] bg-[#041e23] p-4">
				<label className="text-white mb-4 block">
					Upload Your Picture <span className="text-[#24a0b5]">*</span>
				</label>
				<div
					id={isLoading ? "pe-none" : ""}
					className="relative h-[200px] rounded-lg border-2 border-dashed border-[#0e464f] bg-[#07373f] flex items-center justify-center cursor-pointer hover:bg-[#07373f]/80 transition-colors"
					onDragOver={(e) => e.preventDefault()}
					onDrop={handleFileDrop}
					onClick={() => document.getElementById("file-input").click()}
				>
					<input
						type="file"
						id="file-input"
						className="hidden"
						onChange={handleFileInput}
						accept="image/*"
					/>
					{localImage && (
						<img
							className="h-full bg-white absolute hover:opacity-[0.2]"
							src={localImage}
						/>
					)}
					<div className="text-center">
						<img
							alt="Upload Icon"
							src="/cloud-icon.svg"
							className="mx-auto h-12 w-12 text-[#24a0b5]"
						/>
						<p className="mt-2 text-sm text-white">
							Drag & drop or click to upload
						</p>
					</div>
				</div>
				{errors.avatar && (
					<p className="mt-2 text-sm text-red-600" id="avatar-error">
						{errors.avatar}
					</p>
				)}
			</div>
			{/* Form Fields */}
			<div className="space-y-4">
				<div>
					<label htmlFor="name" className="block text-white mb-1.5">
						Full Name <span className="text-[#24a0b5]">*</span>
					</label>
					<input
						id="fullName"
						name="fullName"
						value={formData.fullName}
						onChange={handleChange}
						type="text"
						className="w-full px-4 py-2 rounded-lg bg-[#041e23] border border-[#0e464f] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24a0b5] focus:border-transparent"
						placeholder="Enter your name"
					/>
					{errors.fullName && (
						<p className="mt-2 text-sm text-red-600" id="fullName-error">
							{errors.fullName}
						</p>
					)}
				</div>

				<div>
					<label htmlFor="email" className="block text-white mb-1.5">
						Email <span className="text-[#24a0b5]">*</span>
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="w-full px-4 py-2 rounded-lg bg-[#041e23] border border-[#0e464f] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#24a0b5] focus:border-transparent"
						placeholder="hello@avioflagos.io"
					/>
					{errors.email && (
						<p className="mt-2 text-sm text-red-600" id="email-error">
							{errors.email}
						</p>
					)}
				</div>
			</div>
			{/* Action Buttons */}
			<div className="flex items-center justify-center max-md:flex-col-reverse gap-4 mt-6 md:border-2 md:border-[#0E464F] md:rounded-[1.4rem] md:px-7">
				<button
					onClick={() => {
						props.back();
					}}
					className="w-full jeju px-4 py-2 border border-[#24a0b5] text-[#24a0b5] rounded-md hover:bg-[#041e23] transition-colors"
				>
					Back
				</button>
				<button
					id="submit-button"
					onClick={() => handleSubmit()}
					disabled={isLoading}
					className="w-full px-4 py-2 jeju flex justify-center items-center bg-[#24a0b5] text-white rounded-md hover:opacity-90 transition-colors"
				>
					{isLoading ? <Loader /> : <span>Get My Ticket</span>}
				</button>
			</div>
		</div>
	);
}

export default AttendeeDetails;
