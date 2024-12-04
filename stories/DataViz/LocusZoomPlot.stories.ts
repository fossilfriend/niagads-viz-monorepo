import type { Meta, StoryObj } from "@storybook/react";

import { LocusZoomPlot } from "@root/components/LocusZoom";

const meta: Meta<typeof LocusZoomPlot> = {
    title: "NIAGADS-VIZ/Data Vizualization/LocusZoomPlot",
    component: LocusZoomPlot,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LocusZoomPlot>;

export const Default: Story = {
    args: {
        population: "ADSP",
        variant: "19:44908684:T:C:rs429358",
        genomeBuild: "GRCh38",
        track: "NG00115_GRCh38_FEMALE",
        serviceBaseUrl: "/service/locuszoom",
    },
};
