import type { TIntegrationType } from "@/types/integrations";
import { ConnectionIntegrationDropbox } from "./dropbox";
import { ConnectionIntegrationGoogleDrive } from "./google-drive";
import { ConnectionIntegrationOneDrive } from "./onedrive";
import type { ConnectionIntegrationProps } from "./types";

export const connectionIntegrations = {
	dropbox: ConnectionIntegrationDropbox,
	"google-drive": ConnectionIntegrationGoogleDrive,
	onedrive: ConnectionIntegrationOneDrive,
} satisfies Record<TIntegrationType, React.FC<ConnectionIntegrationProps>>;
