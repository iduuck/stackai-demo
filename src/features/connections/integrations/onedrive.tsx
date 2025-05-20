import { fetchDataOptions } from "@/lib/queries/data";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../connection-table/columns";
import { Table } from "../connection-table/table";

export function ConnectionIntegrationOneDrive() {
	const { data } = useSuspenseQuery(fetchDataOptions("onedrive"));

	return <Table data={data} columns={columns} />;
}
