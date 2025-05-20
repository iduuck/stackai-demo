import type { PropsWithChildren } from "react";
import { ConnectionDialogSidebarHeader } from "./sidebar-header";

export function ConnectionDialogSidebar({ children }: PropsWithChildren) {
	return (
		<aside className="select-none shrink-0 bg-sidebar min-h-128 w-58 border-r border-sidebar-border">
			<ConnectionDialogSidebarHeader />
			<main className="p-2 flex flex-col gap-2">{children}</main>
		</aside>
	);
}
