import { useTranslations } from "@/lib/intl";
import { cn } from "@/lib/utils";
import type { TIntegrationType } from "@/types/integrations";
import { Slot } from "@radix-ui/react-slot";
import { type MouseEventHandler, useCallback } from "react";
import { ConnectionIcon } from "../icons";
import { useIntegrationType } from "../store";

export interface ConnectionDialogSidebarItemProps {
	/**
	 * Icon for the item
	 *
	 * @optional
	 * @default Icon based on the type
	 */
	icon?: React.ReactNode;

	/**
	 * Type of the item
	 */
	type: TIntegrationType;

	/**
	 * Custom Label for the item
	 * @default i18n string
	 */
	label?: string;

	/**
	 * Sub-Label for the item
	 *
	 * @optional
	 */
	sublabel?: string;
}

export function ConnectionDialogSidebarItem(
	props: ConnectionDialogSidebarItemProps,
) {
	/**
	 * State, and active states.
	 */
	const [type, changeType] = useIntegrationType();
	const active = props.type === type;

	const t = useTranslations("Integrations.types");
	const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
		changeType(props.type);
	}, [changeType, props.type]);

	/**
	 * Fallback icon for the item
	 *
	 * Using a `span` to not error the component, when type is strangely undefined
	 * or not found.
	 */
	const icon = props.icon ?? <ConnectionIcon type={props.type} />;

	return (
		<button
			type="button"
			onClick={handleClick}
			className={cn(
				"flex cursor-pointer items-center gap-2 rounded-lg p-2 px-3 text-left transition-colors",
				active && "bg-sidebar-border/80",
				!active && "hover:bg-sidebar-accent active:bg-sidebar-border",
			)}
		>
			<Slot className="size-4 rounded-sm">{icon}</Slot>

			<p className="min-w-px flex-1 truncate whitespace-nowrap font-medium text-sm">
				{props.label ?? t(props.type)}

				{props.sublabel ? (
					<span className="font-normal text-muted-foreground text-sm">
						{" "}
						{props.sublabel}
					</span>
				) : null}
			</p>
		</button>
	);
}
