import { fetchDataOptions } from "@/lib/queries/data";
import { useQuery } from "@tanstack/react-query";
import { columns } from "../connection-table/columns";
import { Table } from "../connection-table/table";
import { TableFallback } from "../connection-table/table-fallback";

export function ConnectionIntegrationGoogleDrive() {
	const { isPending, data } = useQuery(fetchDataOptions("google-drive"));

	if (isPending) return <TableFallback />;
	if (!data) return <span>Not Found</span>;

	return <Table data={data} columns={columns} />;
}
