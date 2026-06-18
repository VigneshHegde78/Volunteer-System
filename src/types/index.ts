// Type definitions for the volunteer system application
export interface Volunteer {
	$id?: string;
	$createdAt?: string;
	$name?: string;
	$email?: string;
	$phone?: string;
	$skills?: string[];
}

export interface RegistrationFormInput {
	name: string;
	email: string;
	phone: string;
	skills: string;
}
