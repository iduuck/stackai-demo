import Image from "next/image";
import type { ConnectionIconProps } from "./types";

export function ConnectionIconDropbox(props: ConnectionIconProps) {
	return (
		<Image
			src="/brand-icons/dropbox.svg"
			width={32}
			height={32}
			alt="Dropbox Logo"
			{...props}
		/>
	);
}
