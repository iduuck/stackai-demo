import type { TConnection } from "@/types/connections";
import type { TIntegrationType } from "@/types/integrations";
import { queryOptions } from "@tanstack/react-query";

export const fetchDataOptions = (type: TIntegrationType) =>
	queryOptions<TConnection[]>({
		queryKey: ["data", type],
		queryFn: () =>
			fetch(`/api/data/${type}`)
				.then((res) => res.json())
				.catch((err) => ({
					error: err,
				})),
	});
