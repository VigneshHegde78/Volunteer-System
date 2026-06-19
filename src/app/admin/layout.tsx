// src/app/admin/layout.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { account } from "@/lib/appwrite";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isChecking, setIsChecking] = useState(true);

	useEffect(() => {
		async function checkSession() {
			try {
				// Appwrite method to fetch active session details of current user
				await account.get();
				setIsAuthenticated(true);

				// If logged in and trying to access the login page, redirect to dashboard
				if (pathname === "/admin/login") {
					router.push("/admin/dashboard");
				}
			} catch (error) {
				setIsAuthenticated(false);
				// If session check fails and we are trying to view protected pages, boot out to login page
				if (pathname !== "/admin/login") {
					router.push("/admin/login");
				}
			} finally {
				setIsChecking(false);
			}
		}

		checkSession();
	}, [pathname, router]);

	// Render a loading state while processing security check
	if (isChecking) {
		return (
			<div className="min-h-screen bg-gray-100 flex items-center justify-center">
				<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
			</div>
		);
	}

	// Allow children rendering if authenticated OR viewing the login screen
	if (isAuthenticated || pathname === "/admin/login") {
		return <>{children}</>;
	}

	return null;
}
