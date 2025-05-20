import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/intl";
import type { TConnection, TConnectionEntity } from "@/types/connections";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Checkbox } from "@radix-ui/react-checkbox";
import type { Table } from "@tanstack/react-table";
import { useIntegrationColumnFilters } from "../store";

interface TableSelectionHeaderProps {
	table: Table<TConnection | TConnectionEntity>;
}

export function TableSelectionHeader({ table }: TableSelectionHeaderProps) {
	const t = useTranslations("Integrations.table-header");
	const [filters, setFilters] = useIntegrationColumnFilters();
	const rowsSelected = table.getSelectedRowModel()?.rows.length;

	return (
		<div className="flex h-10 items-center justify-between border-gray-200 border-b py-2 pr-1 pl-3">
			<div className="flex select-none gap-2">
				<Checkbox
					id="check-all"
					checked={table.getIsAllRowsSelected()}
					onCheckedChange={(checked) =>
						table.toggleAllRowsSelected(Boolean(checked))
					}
				/>
				<label
					htmlFor="check-all"
					className="font-medium text-muted-foreground text-xs"
				>
					{t("select-all")}
				</label>
			</div>

			<div className="flex items-center justify-center gap-2">
				<Button size="xs" variant="ghost">
					{t("upload")}
				</Button>

				<SearchInput onValueChange={(val) => table.setGlobalFilter(val)} />
			</div>
		</div>
	);
}

interface SearchInputProps {
	onValueChange: (value: string) => void;
}

function SearchInput(props: SearchInputProps) {
	const t = useTranslations("Integrations.table-header");

	return (
		<label
			htmlFor="search"
			className="focus-within:!border-foreground/50 relative flex h-7 w-full max-w-7 rounded-md border border-foreground/10 ring-3 ring-transparent transition-all duration-400 focus-within:max-w-72 focus-within:ring-foreground/10 hover:border-foreground/20"
		>
			<MagnifyingGlassIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-1.5 size-3.5 fill-muted-foreground" />
			<input
				id="search"
				className="h-6.5 w-full cursor-pointer pl-7 text-sm outline-none focus:cursor-text"
				placeholder={t("search")}
				onChange={(e) => props.onValueChange(e.target.value)}
			/>
		</label>
	);
}
