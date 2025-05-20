export type TIntegrationType = "onedrive" | "google-drive" | "dropbox";

export interface TIntegration {
	id: string;
	type: "onedrive" | "google-drive" | "dropbox";
	name: string;
	accountName?: string;
}

export const mockIntegrations: TIntegration[] = [
	{
		id: "personal-one-drive",
		type: "onedrive",
		name: "OneDrive",
	},
	{
		id: "google-drive",
		type: "google-drive",
		name: "Google Drive",
	},
	{
		id: "dropbox",
		type: "dropbox",
		name: "Dropbox",
	},
];
