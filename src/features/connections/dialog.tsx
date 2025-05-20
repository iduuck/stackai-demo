"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { mockIntegrations } from "@/types/integrations";
import { type DragEventHandler, useCallback, useEffect, useState } from "react";
import { ConnectionDialogContent } from "./dialog/content";
import { ConnectionDialogSidebar } from "./dialog/sidebar";
import { ConnectionDialogSidebarItem } from "./dialog/sidebar-item";
import { ConnectionDragOverlay } from "./drag-overlay";

export function ConnectionDialog() {
	const [open, setOpen] = useState(false);
	const [dragging, setDragging] = useState(false);

	useEffect(() => {
		setOpen(true);
	}, []);

	const handleClose = useCallback((opened: boolean) => {
		/**
		 * Close the dialog
		 */
		setOpen(opened);

		/**
		 * When closed:
		 * Reopen the dialog after 2 seconds
		 */
		if (!opened) setTimeout(() => setOpen(true), 1000);
	}, []);

	const handleDragOver = useCallback(() => {
		setDragging(true);
	}, []);

	const handleDragLeave = useCallback(() => {
		setDragging(false);
	}, []);

	/**
	 * This is only a mock function, which can work as handler for uploading files.
	 */
	const handleDrop = useCallback<DragEventHandler<HTMLDivElement>>((evt) => {
		evt.stopPropagation();
		evt.preventDefault();

		return false;
	}, []);

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent
				/** No description available in this dialog */
				aria-describedby={undefined}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				className="flex h-128 items-stretch gap-0 overflow-hidden p-0 sm:max-w-4xl"
			>
				<ConnectionDragOverlay active={dragging} />

				<ConnectionDialogSidebar>
					{mockIntegrations.map((integration) => (
						<ConnectionDialogSidebarItem
							key={integration.id}
							type={integration.type}
							label={integration.name}
							sublabel={integration.accountName}
						/>
					))}
				</ConnectionDialogSidebar>
				<ConnectionDialogContent />
			</DialogContent>
		</Dialog>
	);
}
