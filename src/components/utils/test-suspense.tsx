"use client";

import { useState } from "react";

/**
 * This component is for testing the suspense feature.
 *
 * It should not be used in production, but only for implementing loading
 * skeletons. You can basically add the `<TestSuspense />` component as
 * direct child of the suspense boundary.
 *
 * You then have a button, which is for quickly switching (and comparing)
 * the boundaries of the elements, that are being loaded.
 */
export function TestSuspense({
	fallback,
	children,
}: {
	fallback: React.ReactNode;
	children: React.ReactNode;
}) {
	const [loading, setLoading] = useState(true);

	return (
		<>
			<button type="button" onClick={() => setLoading((s) => !s)}>
				{loading ? "Disable load" : "Enable load"}
			</button>

			{loading ? fallback : children}
		</>
	);
}
