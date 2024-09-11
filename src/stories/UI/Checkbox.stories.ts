import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '@components/UI/Checkbox'

const meta: Meta<typeof Checkbox> = {
    title: 'NIAGADS-VIZ/UI/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        variant: "primary",
        value: 'Option A',
        disabled: false,
        onChange: (event) => alert("I've been toggled!")
    },
};