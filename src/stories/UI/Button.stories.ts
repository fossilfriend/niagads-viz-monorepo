import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@components/UI/Button'

const meta: Meta<typeof Button> = {
  title: 'NIAGADS-VIZ/UI/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant:"primary",
    children: 'Example Button',
    //onClick: (event) => alert("I've been clicked!")
  },
};