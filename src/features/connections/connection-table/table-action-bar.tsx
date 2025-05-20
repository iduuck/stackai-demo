import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TConnection, TConnectionEntity } from "@/types/connections";
import type { Table } from "@tanstack/react-table";

interface TableActionBarProps {
	table: Table<TConnection | TConnectionEntity>;
}

export function TableActionBar({ table }: TableActionBarProps) {
	const rowsSelected = table.getSelectedRowModel()?.rows.length;
	const hasRowsSelected = rowsSelected > 0;

	return (
		<>
			<div
				className={cn(
					"pointer-events-none absolute inset-x-0 bottom-0 z-10 flex translate-y-4 items-center justify-center p-2 opacity-0 blur-sm transition-all",
					hasRowsSelected &&
						"pointer-events-auto translate-y-0 opacity-100 blur-none",
				)}
			>
				<div className="flex w-full items-center justify-between gap-2 rounded-lg bg-background/80 p-2 shadow-sm ring ring-black/8 backdrop-blur-sm">
					<p className="pr-1 pl-2 font-medium text-muted-foreground text-xs">
						{rowsSelected} files selected
					</p>
					<div className="flex items-center gap-2">
						<Button size="xs" variant="outline">
							Remove
						</Button>
						<Button size="xs" variant="outline">
							Refresh folders
						</Button>
						<Button size="xs" variant="default">
							Import
						</Button>
					</div>
				</div>
			</div>

			{/* Placeholder, so that the table is being scrollable until the bottom */}
			<div
				data-visible={hasRowsSelected ? "" : undefined}
				className={cn("h-0 transition-all data-visible:h-14")}
			/>
		</>
	);
}
