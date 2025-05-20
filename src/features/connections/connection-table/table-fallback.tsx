import { Skeleton } from "@/components/ui/skeleton";
import type { JSX } from "react";

/**
 * Create an amount of mock rows for the table fallback.
 */
const rows = Array.from({ length: 100 }).map((_, index) => index);

export function TableFallback(): JSX.Element {
	return (
		<div className="h-full flex-auto">
			<div className="mask-b-from-20 h-full p-2 px-4">
				<div className="flex h-10 items-center justify-between border-gray-200 border-b px-3 py-2">
					<div className="flex select-none items-center gap-2">
						<Skeleton className="size-4" />
						<Skeleton className="h-3 w-20" />
					</div>

					<div className="flex items-center justify-center gap-2">
						<Skeleton className="h-3 w-20" />
					</div>
				</div>

				<table className="w-full">
					<thead className="hidden">
						<tr>
							<th>
								<Skeleton className="size-4" />
							</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((row) => (
							<tr
								key={row}
								className="h-10 border-gray-200 border-b transition-all [vertical-align:middle] hover:bg-accent"
							>
								<td className="px-1">
									<div className="flex items-center gap-2">
										<div className="flex">
											<div className="flex w-8 items-center justify-center">
												<Skeleton className="size-3" />
											</div>
											<div className="flex w-8 items-center justify-center">
												<Skeleton className="size-4" />
											</div>
										</div>
										<Skeleton className="h-4 w-36" />
									</div>
								</td>
								<td className="px-1" width="88">
									<Skeleton className="h-6 w-20" />
								</td>
								<td className="px-1" width="32">
									<Skeleton className="h-6 w-6" />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
