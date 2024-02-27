import type { Meta, StoryObj } from '@storybook/react';

import { ColoredText } from '@text/index';

const meta: Meta<typeof ColoredText> = {
  title: 'NIAGADS-VIZ/Text/ColoredText',
  component: ColoredText,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ColoredText>;

export const Default: Story = {
  args: {
    value: 'colored text',
    color: 'red'
  },
};