import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/intl";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Suspense } from "react";
import { TableFallback } from "../connection-table/table-fallback";
import { ConnectionIcon } from "../icons";
import { connectionIntegrations } from "../integrations";
import { useIntegrationsStore } from "../store";

export function ConnectionDialogContent() {
	const t = useTranslations("Integrations");
	const integrationType = useIntegrationsStore((s) => s.type);

	if (!integrationType) {
		return <div>Integration not found</div>;
	}

	const Component = connectionIntegrations[integrationType];

	return (
		<main className="flex min-w-px flex-1 flex-col">
			<div className="px-4">
				<header className="flex items-center gap-3 border-sidebar-border border-b py-2 pl-2">
					<ConnectionIcon type={integrationType} className="size-4" />

					<h2 className="flex-1 font-semibold text-base">
						{t(`types.${integrationType}`)}
					</h2>

					<Button
						variant="ghost"
						size="sm"
						onClick={() => alert("Not implemented.")}
					>
						<PlusIcon />
						{t("header.add-account")}
					</Button>
				</header>
			</div>

			<div className="relative h-full min-h-px">
				<Suspense fallback={<TableFallback />}>
					<Component />
				</Suspense>
			</div>
		</main>
	);
}
