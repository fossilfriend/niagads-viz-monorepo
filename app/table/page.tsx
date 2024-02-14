import Table from "@table/Table";
import { data, columns } from "@data/examples/table";
import { Column, Data } from "@table/common/types";

const Page = () => {
    return (
        <>
            <h1>Table Test</h1>
            <Table
                data={data}
                columns={columns as Column<Data>[]}
            />
        </>
    )
}

export default Page;
