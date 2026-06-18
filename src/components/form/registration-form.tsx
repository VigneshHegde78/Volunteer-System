// Registration Form
"use client";
import { ID } from "appwrite";
import { CONF, databases } from "@/lib/appwrite";
import { FormErrors, validateRegistrationForm } from "@/lib/validation";
import { RegistrationFormInput } from "@/types";
import { useState } from "react";

export default function RegistrationForm() {
	const [formData, setFormData] = useState<RegistrationFormInput>({
		name: "",
		email: "",
		phone: "",
		skills: "",
	});

	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<{
		success: boolean;
		message: string;
	} | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus(null);

		// Validate form data
		const validationErrors = validateRegistrationForm(formData);
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			setIsSubmitting(false);
			return;
		}

		try {
			// Process raw comma-separated skills into an array
			const skillsArray = formData.skills
				? formData.skills
						.split(",")
						.map((skill) => skill.trim())
						.filter(Boolean)
				: [];

			// Save record to Appwrite database
			await databases.createDocument(
				CONF.databaseId,
				CONF.collectionId,
				ID.unique(),
				{
					name: formData.name.trim(),
					email: formData.email.trim(),
					phone: formData.phone.trim(),
					skills: skillsArray,
				},
			);

			setSubmitStatus({ success: true, message: "Thank you for registering!" });
			setFormData({ name: "", email: "", phone: "", skills: "" });
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setSubmitStatus({
				success: false,
				message: error.message || "Something went wrong. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-6 text-gray-800">
				Volunteer Registration
			</h2>

			{submitStatus && (
				<div
					className={`p-4 mb-4 text-sm rounded ${submitStatus.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
				>
					{submitStatus.message}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4" noValidate>
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700"
					>
						Full Name *
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className={`mt-1 block w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900`}
						aria-invalid={!!errors.name}
						aria-describedby={errors.name ? "name-error" : undefined}
					/>
					{errors.name && (
						<p id="name-error" className="mt-1 text-xs text-red-600">
							{errors.name}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						Email Address *
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className={`mt-1 block w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900`}
						aria-invalid={!!errors.email}
						aria-describedby={errors.email ? "email-error" : undefined}
					/>
					{errors.email && (
						<p id="email-error" className="mt-1 text-xs text-red-600">
							{errors.email}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="phone"
						className="block text-sm font-medium text-gray-700"
					>
						Phone Number *
					</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						className={`mt-1 block w-full px-3 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900`}
						aria-invalid={!!errors.phone}
						aria-describedby={errors.phone ? "phone-error" : undefined}
					/>
					{errors.phone && (
						<p id="phone-error" className="mt-1 text-xs text-red-600">
							{errors.phone}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="skills"
						className="block text-sm font-medium text-gray-700"
					>
						Skills (Comma separated)
					</label>
					<input
						type="text"
						id="skills"
						name="skills"
						value={formData.skills}
						onChange={handleChange}
						placeholder="React, Design, Event Management"
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
					/>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
				>
					{isSubmitting ? "Registering..." : "Register as Volunteer"}
				</button>
			</form>
		</div>
	);
}
