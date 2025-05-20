import type { TConnection, TConnectionEntity } from "@/types/connections";
import type { TIntegrationType } from "@/types/integrations";
import { faker } from "@faker-js/faker";

function range<T extends {}>(
	len: number,
	mapper: (index: number) => T | null | undefined,
) {
	const arr: number[] = [];
	for (let i = 0; i < len; i++) {
		arr.push(i);
	}

	// NOTE: Typescript didn't type the `.filter(Boolean)` correctly.
	// But this is working and type-safe.
	return arr.map(mapper).filter(Boolean) as T[];
}

export function makeData(type: TIntegrationType = "google-drive", count = 3) {
	return range<TConnection>(count, () => makeConnectionData(type));
}

export function makeConnectionData(type: TIntegrationType): TConnection {
	const depth = 0;

	return {
		id: faker.string.nanoid(),
		type,
		email: faker.internet.email(),
		name: faker.company.name(),
		entities: range<TConnectionEntity>(3, () => newConnectionEntity(depth)),
	};
}

export function newConnectionEntity(depth: number): TConnectionEntity | null {
	const type = faker.helpers.arrayElement(["folder", "file"]);
	const fileType = faker.helpers.arrayElement([
		"pdf",
		"png",
		"jpg",
		"mp4",
		"mp3",
		"txt",
		"doc",
	]);

	if (depth > 2) {
		return null;
	}

	if (type === "folder") {
		const isImported = faker.datatype.boolean();
		return {
			id: faker.string.nanoid(),
			type,
			name: `${faker.finance.accountName()} Folder`,
			isImported,
			entities: range<TConnectionEntity>(3, () =>
				newConnectionEntity(depth + 1),
			).map((c) => ({ ...c, isImported })),
		};
	}

	return {
		id: faker.string.nanoid(),
		type,
		name: `${faker.finance.accountName()}.${fileType}`,
		isImported: faker.datatype.boolean(),

		/**
		 * There are many more file types, but this is just a demo.
		 */
		fileType,
	};
}
