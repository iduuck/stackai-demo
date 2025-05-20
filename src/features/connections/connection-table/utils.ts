import type { TConnection, TConnectionEntity } from "@/types/connections";
import { rankItem } from "@tanstack/match-sorter-utils";
import { compareItems } from "@tanstack/match-sorter-utils";
import type { FilterFn, Row, SortingFn } from "@tanstack/react-table";
import { sortingFns } from "@tanstack/react-table";

export function isEntity(row: Row<TConnection | TConnectionEntity>) {
	const { original } = row;

	if (original.type === "folder") {
		return "folder";
	}

	if (original.type === "file") {
		return "file";
	}

	return false;
}

/**
 * This is a custom filter function for a `@tanstack/react-table` table.
 * It fuzzy-searches the item based on the given value.
 *
 * NOTE: Using `any` here, because this could be basically anything from any table
 */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
	console.log(row.original);
	// Rank the item
	const itemRank = rankItem(row.getValue(columnId), value);

	// Store the itemRank info
	addMeta({ itemRank });

	// Return if the item should be filtered in/out
	return itemRank.passed;
};

/**
 * This is a custom sorting function for a `@tanstack/react-table` table.
 * It sorts the items based on the ranking information.
 *
 * NOTE: Using `any` here, because this could be basically anything from any table
 */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
	let dir = 0;

	// Only sort by rank if the column has ranking information
	if (rowA.columnFiltersMeta[columnId]) {
		dir = compareItems(
			rowA.columnFiltersMeta[columnId]?.itemRank!,
			rowB.columnFiltersMeta[columnId]?.itemRank!,
		);
	}

	// Provide an alphanumeric fallback for when the item ranks are equal
	return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};
