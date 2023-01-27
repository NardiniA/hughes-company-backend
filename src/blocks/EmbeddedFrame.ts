import { Block } from "payload/types";
import url from "../fields/url";

const EmbeddedFrame: Block = {
    slug: "embedded-frame",
    labels: {
        singular: "Embedded Frame",
        plural: "Embedded Frames",
    },
    fields: [
        {
            name: "title",
            label: "Frame Title",
            type: "text",
            required: true,
            admin: {
                description: "This is shown if the frame does not load/show.",
            },
        },
        {
            type: "row",
            fields: [
                {
                    name: "width",
                    label: "Width",
                    type: "number",
                    required: true,
                },
                {
                    name: "height",
                    label: "Height",
                    type: "number",
                    required: true,
                },
            ],
        },
        url({
            name: "url",
            label: "Frame Link",
        }),
    ],
}

export default EmbeddedFrame;
