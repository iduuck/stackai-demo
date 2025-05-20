import { useTranslations } from "@/lib/intl";
import { cn } from "@/lib/utils";

export interface ConnectionDragOverlayProps {
	active: boolean;
}

export function ConnectionDragOverlay({ active }: ConnectionDragOverlayProps) {
	const t = useTranslations("Integrations.drag-overlay");
	return (
		<div
			data-active={active ? "" : undefined}
			className={cn(
				"absolute inset-0 p-2 bg-sidebar/50 data-active:opacity-100 transition-opacity opacity-0 pointer-events-none",
			)}
		>
			<div className="h-full w-full border-2 border-sidebar-border/80 rounded-sm flex items-center justify-center border-dashed">
				<p className="text-sm font-semibold">{t("label")}</p>
			</div>
		</div>
	);
}
