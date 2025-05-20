import type { PropsWithChildren } from "react";
import { ConnectionDialogSidebarHeader } from "./sidebar-header";

export function ConnectionDialogSidebar({ children }: PropsWithChildren) {
	return (
		<aside className="min-h-128 w-58 shrink-0 select-none border-sidebar-border border-r bg-sidebar">
			<ConnectionDialogSidebarHeader />
			<main className="flex flex-col gap-2 p-2">{children}</main>
		</aside>
	);
}
