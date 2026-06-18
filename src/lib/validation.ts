// Validation configuration for the application
import { RegistrationFormInput } from "@/types";

export interface FormErrors {
	name?: string;
	email?: string;
	phone?: string;
}

export function validateRegistrationForm(
	data: RegistrationFormInput,
): FormErrors {
	const errors: FormErrors = {};

	// Name Validation
	if (!data.name.trim()) {
		errors.name = "Name is required.";
	} else if (data.name.trim().length < 2) {
		errors.name = "Name must be at least 2 characters.";
	}

	// Email Validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!data.email.trim()) {
		errors.email = "Email is required.";
	} else if (!emailRegex.test(data.email.trim())) {
		errors.email = "Please enter a valid email address.";
	}

	// Phone Validation
	const phoneRegex = /^[6-9]\d{9}$/;
	if (!data.phone.trim()) {
		errors.phone = "Phone number is required.";
	} else if (!phoneRegex.test(data.phone.trim())) {
		errors.phone = "Please enter a valid 10-digit phone number.";
	}

	return errors;
}
