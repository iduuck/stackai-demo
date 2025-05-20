"use client";
import { useScan } from "react-scan";

export function ReactScan() {
	useScan({
		enabled: false,
		showToolbar: true,
		/** This of course needs to be removed for production. */
		dangerouslyForceRunInProduction: true,
	});

	return <></>;
}
