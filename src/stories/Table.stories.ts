import type { Meta, StoryObj } from '@storybook/react';

import { Table, TableData, Column } from '@table/index';
import { data, options, columns } from '../../example/data/examples/table.js';

const meta: Meta<typeof Table> = {
  title: 'NIAGADS-VIZ/Table',
  component: Table,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
    args: {
        data: data,
        columns: columns as Column<TableData>[]
    }
};