import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/intl";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { memo } from "react";

function PureConnectionDialogSidebarHeader() {
	const t = useTranslations("Integrations.sidebar");

	return (
		<DialogTitle asChild>
			<header className="flex items-center gap-1 border-sidebar-border/50 border-b p-2">
				<DialogClose asChild>
					<Button variant="ghost" size="sm" aria-label={t("close")}>
						<XMarkIcon />
					</Button>
				</DialogClose>
				<h3 className="font-semibold text-base">{t("title")}</h3>
			</header>
		</DialogTitle>
	);
}

/**
 * Memoize the component to prevent unnecessary re-renders.
 */
export const ConnectionDialogSidebarHeader = memo(
	PureConnectionDialogSidebarHeader,
);
