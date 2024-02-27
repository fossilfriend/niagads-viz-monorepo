'use client'

import { Table, TableData, Column }  from "@niagads-viz/Table";
import { data, columns } from "@data/examples/table";

const Page = () => {
    return (
        <>
            <h1>Table Test</h1>
            <Table
                data={data}
                columns={columns as Column<TableData>[]}
            />
        </>
    )
}

export default Page;
