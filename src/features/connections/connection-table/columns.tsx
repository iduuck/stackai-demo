import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TConnection, TConnectionEntity } from "@/types/connections";
import type { TIntegrationType } from "@/types/integrations";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import {
	ArrowDownTrayIcon,
	CheckCircleIcon,
	DocumentIcon,
	FolderIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import type { ColumnDef } from "@tanstack/react-table";
import { ConnectionIcon } from "../icons";
import { isEntity } from "./utils";

export const columns: ColumnDef<TConnection | TConnectionEntity>[] = [
	{
		id: "name",
		accessorFn: (row) => row.name,
		header: () => <p className="pl-18 text-left font-medium text-xs">Name</p>,
		size: 400,
		maxSize: 400,
		cell: ({ row }) => {
			const val = row.original;

			const rowIsEntity = isEntity(row);

			return (
				<div
					className="flex items-center gap-2"
					style={{
						// Since rows are flattened by default,
						// we can use the row.depth property
						// and paddingLeft to visually indicate the depth
						// of the row
						paddingLeft: `${row.depth * 32}px`,
					}}
				>
					<div className="flex">
						{row.getCanExpand() ? (
							<div className="flex h-10 w-8 items-center justify-center">
								<button
									type="button"
									className="group size-6 cursor-pointer rounded-md p-1 transition-colors hover:bg-accent-foreground/10"
									data-expanded={row.getIsExpanded() ? "" : undefined}
									onClick={() => row.toggleExpanded()}
								>
									<ChevronDownIcon className="-rotate-90 size-4 text-muted-foreground transition-all group-hover:text-primary group-data-expanded:rotate-0" />
								</button>
							</div>
						) : (
							<div className="h-10 w-8" />
						)}
						{row.getCanSelect() ? (
							<div className="flex h-10 w-8 items-center justify-center">
								<Checkbox
									checked={row.getIsSelected()}
									onCheckedChange={(checked) =>
										row.toggleSelected(Boolean(checked))
									}
								/>
							</div>
						) : null}
					</div>

					{!rowIsEntity ? (
						<ConnectionIcon
							type={val.type as TIntegrationType}
							className="size-3"
						/>
					) : null}
					{rowIsEntity === "folder" ? (
						<FolderIcon className="size-3 text-muted-foreground" />
					) : null}
					{rowIsEntity === "file" ? (
						<DocumentIcon className="size-3 text-muted-foreground" />
					) : null}

					<p className="truncate">
						<span className="font-medium text-sm">{val.name}</span>
						{"email" in val ? (
							<span className="text-muted-foreground text-sm">
								{" "}
								{val.email}
							</span>
						) : null}
					</p>
				</div>
			);
		},
	},
	{
		id: "actions",
		accessorKey: "isImported",
		size: 150,
		header: () => (
			<p className="w-full text-right font-medium text-xs">Actions</p>
		),
		cell: ({ getValue, row }) => {
			const isImported = getValue<boolean>();

			if (isEntity(row)) {
				return (
					<div className="flex items-center justify-end gap-1">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button size="xs" variant="outline">
									<EllipsisHorizontalIcon />
								</Button>
							</DropdownMenuTrigger>

							<DropdownMenuContent align="end" className="w-52">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuGroup>
									<DropdownMenuItem onClick={() => console.log("select")}>
										<CheckCircleIcon className="text-muted-foreground" />
										{row.getIsSelected() ? "Uns" : "S"}elect
										{row.original.type === "folder"
											? " all items"
											: " this file"}
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() =>
											alert("This is mock data, the file is not downloadable.")
										}
									>
										<ArrowDownTrayIcon className="text-muted-foreground" />
										Download{" "}
										{row.original.type === "folder" ? "folder" : "file"}
									</DropdownMenuItem>
									<DropdownMenuLabel>Destructive Actions</DropdownMenuLabel>
									<DropdownMenuItem>
										<TrashIcon className="text-muted-foreground" />
										Deindex this
										{row.original.type === "folder" ? " folder" : " file"}
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			}

			return (
				<div className="flex items-center justify-end gap-1">
					<Button
						size="xs"
						variant="outline"
						onClick={() => alert("not implemented")}
					>
						Manage
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size="xs" variant="outline">
								<EllipsisHorizontalIcon />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="end" className="w-52">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuGroup>
								<DropdownMenuItem onClick={() => console.log("select")}>
									<CheckCircleIcon className="text-muted-foreground" />
									Select file
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() =>
										alert("This is mock data, the file is not downloadable.")
									}
								>
									<ArrowDownTrayIcon className="text-muted-foreground" />
									Download file
								</DropdownMenuItem>
								<DropdownMenuLabel>Destructive Actions</DropdownMenuLabel>
								<DropdownMenuItem>
									<TrashIcon className="text-muted-foreground" />
									De-index this file
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];
