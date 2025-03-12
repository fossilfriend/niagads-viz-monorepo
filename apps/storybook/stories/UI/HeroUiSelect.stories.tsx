import type { Meta, StoryObj } from '@storybook/react';
import React from "react";
import {select} from "@heroui/theme";
import { Select, SelectItem, SelectProps } from '@heroui/select'

export default {
    title: "HeroUI/Select",
    component: Select,
    argTypes: {
        variant: {
            control: {
                type: "select",
            },
            options: ["flat", "faded", "bordered", "underlined"],
        },
        color: {
            control: {
                type: "select",
            },
            options: ["default", "primary", "secondary", "success", "warning", "danger"],
        },
        radius: {
            control: {
                type: "select",
            },
            options: ["none", "sm", "md", "lg", "full"],
        },
        size: {
            control: {
                type: "select",
            },
            options: ["sm", "md", "lg"],
        },
        labelPlacement: {
            control: {
                type: "select",
            },
            options: ["inside", "outside", "outside-left"],
        },
        isDisabled: {
            control: {
                type: "boolean",
            },
        },
    }
} as Meta<typeof Select>;

const animalsData: any = [
    { label: "Cat", value: "cat", description: "The second most popular pet in the world" },
    { label: "Dog", value: "dog", description: "The most popular pet in the world" },
    { label: "Elephant", value: "elephant", description: "The largest land animal" },
    { label: "Lion", value: "lion", description: "The king of the jungle" },
    { label: "Tiger", value: "tiger", description: "The largest cat species" },
    { label: "Giraffe", value: "giraffe", description: "The tallest land animal" }]

const items = animalsData.map((item) => <SelectItem key={item.value}>{item.label}</SelectItem>);
const Template = ({ color, variant, ...args }: SelectProps) => (
    <Select className="max-w-xs" color={color} label="Favorite Animal" variant={variant} {...args}>
        {items}
    </Select>
);

const defaultProps = {
    ...select.defaultVariants,
  };
  

export const Default = {
    render: Template,
  
    args: {
      ...defaultProps,
    },
  };