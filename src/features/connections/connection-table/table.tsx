import { cn } from "@/lib/utils";
import type { TConnection, TConnectionEntity } from "@/types/connections";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import {
	type ColumnDef,
	type Row,
	type Table as TTable,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import type { JSX } from "react";
import { TableActionBar } from "./table-action-bar";
import { TableSelectionHeader } from "./table-selection-header";
import { fuzzyFilter, fuzzySort } from "./utils";

export interface TableProps<TData> {
	data: TData[];
	columns: ColumnDef<TData>[];
}

const getSubRows = (row: TConnection | TConnectionEntity, index: number) =>
	"entities" in row ? row.entities : undefined;
const getRowCanExpand = (row: Row<TConnection | TConnectionEntity>) =>
	"entities" in row.original && !!row.original.entities?.length;

export function Table({
	data,
	columns,
}: TableProps<TConnection | TConnectionEntity>): JSX.Element {
	const table = useReactTable<TConnection | TConnectionEntity>({
		/**
		 * NOTE: This needs to be disabled, once deployed to prod.
		 */
		debugAll: true,

		/**
		 * The data to be displayed in the table.
		 */
		data,
		columns,

		/**
		 * All the methods and functions for the sub-rows.
		 */
		getSubRows,
		getRowCanExpand,

		/**
		 * This will ensure, that we have a top-down filter, that is first
		 * searching the leaf-rows.
		 */
		filterFromLeafRows: true,

		/** Row models */
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),

		sortingFns: { fuzzy: fuzzySort },
		filterFns: { fuzzy: fuzzyFilter },

		// @ts-expect-error: something seems wrong with the typings.
		// This is actually from the docs.
		globalFilterFn: "fuzzy",
	});

	return (
		<div className="h-full flex-auto">
			<div className={cn("h-full overflow-auto p-2 px-4")}>
				<TableSelectionHeader table={table} />

				<table className="w-full">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className="border-border border-b">
								{headerGroup.headers.map((header, index) => {
									return (
										<th
											key={header.id}
											colSpan={header.colSpan}
											className={cn("h-8")}
										>
											{header.isPlaceholder ? null : (
												<div
													className={cn(
														"flex items-center gap-1",
														index === 0 ? "justify-start" : "justify-end",
													)}
												>
													{flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
													<button
														type="button"
														onClick={header.column.getToggleSortingHandler()}
														className="-space-y-1 flex size-5 flex-col items-center justify-center rounded-md hover:bg-accent"
													>
														<ChevronUpIcon
															className={cn(
																"size-2.5 text-muted-foreground",
																header.column.getNextSortingOrder() === "asc" &&
																	"text-foreground",
															)}
														/>
														<ChevronDownIcon
															className={cn(
																"size-2.5 text-muted-foreground",
																header.column.getNextSortingOrder() ===
																	"desc" && "text-foreground",
															)}
														/>
													</button>
												</div>
											)}
										</th>
									);
								})}
							</tr>
						))}
					</thead>
					<TableBody table={table} />
				</table>
				<TableActionBar table={table} />
			</div>
		</div>
	);
}

interface TableBodyProps {
	table: TTable<TConnection | TConnectionEntity>;
}

function TableBody({ table }: TableBodyProps) {
	const { rows } = table.getRowModel();

	return (
		<tbody>
			{rows.map((row) => {
				return <TableBodyRow key={row.id} row={row} />;
			})}
		</tbody>
	);
}

interface TableBodyRowProps {
	row: Row<TConnection | TConnectionEntity>;
}

function TableBodyRow({ row }: TableBodyRowProps) {
	return (
		<tr
			data-index={row.index} //needed for dynamic row height measurement
			className="h-10 border-gray-200 border-b transition-all [vertical-align:middle] hover:bg-accent"
		>
			{/* first row is a normal row */}
			{row.getVisibleCells().map((cell) => {
				return (
					<td
						key={cell.id}
						width={`${cell.column.getSize()}px`}
						className="px-1"
					>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</td>
				);
			})}
		</tr>
	);
}
