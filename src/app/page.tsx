import { DEFAULT_SELECTED_INTEGRATION } from "@/const/integrations";
import { ConnectionDialog } from "@/features/connections";
import { fetchDataOptions } from "@/lib/queries/data";
import { getQueryClient } from "@/lib/rq";

export default function Home() {
	const queryClient = getQueryClient();

	void queryClient.prefetchQuery(
		fetchDataOptions(DEFAULT_SELECTED_INTEGRATION),
	);

	return <ConnectionDialog />;
}
