import { DEFAULT_SELECTED_INTEGRATION } from "@/const/integrations";
import type { TIntegrationType } from "@/types/integrations";
import type { ColumnFiltersState } from "@tanstack/react-table";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

type Updater<T> = T | ((old: T) => T);
type OnChangeFn<T> = (updaterOrValue: Updater<T>) => void;

interface IntegrationState {
	type: TIntegrationType;

	columnFilters: ColumnFiltersState;
}

interface IntegrationActions {
	changeType: (type: TIntegrationType) => void;

	setColumnFilters: OnChangeFn<ColumnFiltersState>;
}

type IntegrationStore = IntegrationState & IntegrationActions;

export const useIntegrationsStore = create<IntegrationStore>((set, get) => ({
	type: DEFAULT_SELECTED_INTEGRATION,
	changeType: (type: TIntegrationType) => set({ type }),

	columnFilters: [],
	setColumnFilters: (filtersOrCurrent) => {
		/** This function mimics the `useState` function. */
		if (filtersOrCurrent instanceof Function) {
			return set({ columnFilters: filtersOrCurrent(get().columnFilters) });
		}

		return set({ columnFilters: filtersOrCurrent });
	},
}));

/**
 * Memoized type selector and complementary hook.
 */
export const integrationTypeSelector = (s: IntegrationStore) =>
	[s.type, s.changeType] as const;
export function useIntegrationType() {
	return useIntegrationsStore(useShallow(integrationTypeSelector));
}

/**
 * Memoized type selector and complementary hook.
 */
export const columnFiltersTypeSelector = (s: IntegrationStore) =>
	[s.columnFilters, s.setColumnFilters] as const;
export function useIntegrationColumnFilters() {
	return useIntegrationsStore(useShallow(columnFiltersTypeSelector));
}
