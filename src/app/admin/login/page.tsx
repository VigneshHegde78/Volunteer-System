// src/app/admin/login/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";

export default function AdminLogin() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);

		try {
			// Create an email/password session in Appwrite
			await account.createEmailPasswordSession(email, password);
			router.push("/admin/dashboard");
		} catch (err) {
			setError((err as Error).message || "Invalid email or password.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-gray-900">
			<div className="sm:mx-auto w-full max-w-md">
				<h2 className="text-center text-3xl font-extrabold text-gray-950">
					Admin Portal Login
				</h2>
			</div>

			<div className="mt-8 sm:mx-auto w-full max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
					{error && (
						<div className="p-3 mb-4 bg-red-100 text-red-700 text-sm rounded">
							{error}
						</div>
					)}

					<form onSubmit={handleLogin} className="space-y-6">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Admin Email
							</label>
							<input
								id="email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<input
								id="password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
							/>
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
						>
							{isSubmitting ? "Authenticating..." : "Sign In"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
