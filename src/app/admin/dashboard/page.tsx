// src/app/admin/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { databases, CONF, account } from "@/lib/appwrite";
import { Models } from "appwrite";
import { Volunteer } from "@/types";
import { useRouter } from "next/navigation";

// Extend the core Volunteer type with Appwrite's built-in document properties ($id, $createdAt)
type VolunteerDocument = Volunteer & Models.Document;

export default function AdminDashboard() {
	const [volunteers, setVolunteers] = useState<VolunteerDocument[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		async function fetchVolunteers() {
			try {
				setIsLoading(true);
				// Fetch documents from the specified database and collection
				const response = await databases.listDocuments<VolunteerDocument>(
					CONF.databaseId,
					CONF.collectionId,
				);
				setVolunteers(response.documents);
			} catch (err) {
				setError(
					(err as Error).message ||
						"Failed to fetch volunteer database records.",
				);
			} finally {
				setIsLoading(false);
			}
		}

		fetchVolunteers();
	}, []);

	const handleLogout = async () => {
		try {
			// Deletes the current active session from the browser and Appwrite
			await account.deleteSession("current");
			router.push("/admin/login");
		} catch (err) {
			console.error("Failed to log out safely", err);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 p-8 text-gray-900">
			<div className="max-w-6xl mx-auto">
				<header className="mb-8 flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Admin Dashboard
						</h1>
						<p className="text-sm text-gray-600 mt-1">
							NayePankh Foundation Volunteers Panel
						</p>
					</div>

					<div className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold">
						Total: {volunteers.length}
					</div>

					<button
						onClick={handleLogout}
						className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
					>
						Logout
					</button>
				</header>

				{isLoading && (
					<div className="flex justify-center items-center py-12">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
					</div>
				)}

				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
						{error}
					</div>
				)}

				{!isLoading && !error && (
					<div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Name
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Email
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Phone
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Skills
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Registered On
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{volunteers.length === 0 ? (
										<tr>
											<td
												colSpan={5}
												className="px-6 py-10 text-center text-sm text-gray-500"
											>
												No volunteers registered yet.
											</td>
										</tr>
									) : (
										volunteers.map((volunteer) => (
											<tr key={volunteer.$id} className="hover:bg-gray-50">
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-950">
													{volunteer.name}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
													{volunteer.email}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
													{volunteer.phone}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
													<div className="flex flex-wrap gap-1">
														{volunteer.skills && volunteer.skills.length > 0 ? (
															volunteer.skills.map((skill, index) => (
																<span
																	key={index}
																	className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
																>
																	{skill}
																</span>
															))
														) : (
															<span className="text-gray-400 italic text-xs">
																None Listed
															</span>
														)}
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{new Date(volunteer.$createdAt).toLocaleDateString(
														"en-IN",
														{
															day: "2-digit",
															month: "short",
															year: "numeric",
														},
													)}
												</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
