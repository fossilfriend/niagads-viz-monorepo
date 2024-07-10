import type { Meta, StoryObj } from '@storybook/react';

import { AnnotatedText } from '@components/TextRenderers/__deprecated__/index';

const meta: Meta<typeof AnnotatedText> = {
  title: 'NIAGADS-VIZ/Text/AnnotatedText',
  component: AnnotatedText,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AnnotatedText>;

export const Default: Story = {
  args: {
    value: {value: 'annotated', tooltip: 'add notes to text that provide an explanation or context'}
  },
};