import Table from "niagads-viz-js/Table";
import { data, columns } from "@data/examples/table";
import { Column, Data } from "niagads-viz-js/common/types";

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
