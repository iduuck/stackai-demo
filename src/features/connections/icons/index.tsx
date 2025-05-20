import type { TIntegrationType } from "@/types/integrations";
import { ConnectionIconDropbox } from "./dropbox";
import { ConnectionIconGoogleDrive } from "./google-drive";
import { ConnectionIconOneDrive } from "./onedrive";
import type { ConnectionIconProps } from "./types";

export const connectionIcons = {
	dropbox: ConnectionIconDropbox,
	"google-drive": ConnectionIconGoogleDrive,
	onedrive: ConnectionIconOneDrive,
} satisfies Record<TIntegrationType, React.FC<ConnectionIconProps>>;

interface BaseConnectionIconProps {
	/**
	 * Type of the icon
	 */
	type: TIntegrationType;

	/**
	 * Additional class names
	 */
	className?: string;
}

export function ConnectionIcon({ type, ...props }: BaseConnectionIconProps) {
	if (type === "dropbox") return <ConnectionIconDropbox {...props} />;
	if (type === "google-drive") return <ConnectionIconGoogleDrive {...props} />;
	if (type === "onedrive") return <ConnectionIconOneDrive {...props} />;

	/**
	 * Fallback icon for the item
	 *
	 * NOTE: This should never happen, but if it does, we are safe.
	 */
	return <span {...props} />;
}
