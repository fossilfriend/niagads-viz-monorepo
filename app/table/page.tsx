import Table from "src/table-updated/Table";
import { data, columns } from "@data/examples/table";
import { Column, Dataset } from "src/table-updated/Common/types";

const Page = () => {
    return (
        <>
            <h1>Table Test</h1>
            <Table
                data={data}
                columns={columns as Column<Dataset>[]}
            />
        </>
    )
}

export default Page;
