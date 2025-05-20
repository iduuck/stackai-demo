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
				"pointer-events-none absolute inset-0 bg-sidebar/50 p-2 opacity-0 transition-opacity data-active:opacity-100",
			)}
		>
			<div className="flex h-full w-full items-center justify-center rounded-sm border-2 border-sidebar-border/80 border-dashed">
				<p className="font-semibold text-sm">{t("label")}</p>
			</div>
		</div>
	);
}
