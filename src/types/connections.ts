import type { TIntegrationType } from "./integrations";

export interface TConnectionFolder {
	type: "folder";
	id: string;
	name: string;
	entities?: TConnectionEntity[];
	isImported: boolean;
}

export interface TConnectionFile {
	type: "file";
	id: string;
	name: string;
	fileType: string;
	isImported: boolean;
}

export type TConnectionEntity = TConnectionFolder | TConnectionFile;

export interface TConnection {
	id: string;
	type: TIntegrationType;
	name: string;
	email: string;
	entities?: TConnectionEntity[];
}
