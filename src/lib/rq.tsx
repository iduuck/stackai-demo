import {
	QueryClient,
	defaultShouldDehydrateQuery,
	isServer,
} from "@tanstack/react-query";

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
			},
			dehydrate: {
				// include pending queries in dehydration
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) ||
					query.state.status === "pending",
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
	if (isServer) {
		// Server: always make a new query client
		return makeQueryClient();
	}

	if (!browserQueryClient) browserQueryClient = makeQueryClient();

	return browserQueryClient;
}
