import Image from "next/image";
import type { ConnectionIconProps } from "./types";

export function ConnectionIconGoogleDrive(props: ConnectionIconProps) {
	return (
		<Image
			src="/brand-icons/google-drive.svg"
			width={32}
			height={32}
			alt="Google Drive Logo"
			{...props}
		/>
	);
}
