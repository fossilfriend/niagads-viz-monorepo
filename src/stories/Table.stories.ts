//@ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";

import Table from "@table/Table";
import { ExampleTable } from "../../example/data/table.ts";

const meta: Meta<typeof Table> = {
    title: "NIAGADS-VIZ/Table",
    component: Table,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
    args: {
        columns: ExampleTable.columns,
        options: ExampleTable.options,
        data: ExampleTable.data,
    },
};
