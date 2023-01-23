import { Block } from "payload/types";

const About: Block = {
    slug: "about",
    labels: {
        singular: "About",
        plural: "About",
    },
    fields: [
        {
            name: "title",
            label: "Title",
            type: "text",
            required: true,
        },
        {
            name: "description",
            label: "Description",
            type: "richText",
            required: true,
            admin: {
                elements: [
                    "h1",
                    "h2",
                    "h3",
                    "h4",
                    "h5",
                    "h6",
                    "link",
                    "ul",
                    "ol",
                ],
            }
        },
        {
            name: "images",
            label: "Images",
            type: "array",
            minRows: 1,
            maxRows: 4,
            fields: [
                {
                    name: "image",
                    label: "Image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
                {
                    name: "size",
                    label: "Size",
                    type: "select",
                    options: [
                        {
                            label: "Full Width",
                            value: "full",
                        },
                        {
                            label: "Half Width",
                            value: "half",
                        },
                        {
                            label: "Third Width",
                            value: "third",
                        },
                        {
                            label: "Quarter Width",
                            value: "quarter",
                        },
                    ],
                    required: true,
                },
            ],
            admin: {
                components: {
                    RowLabel: ({ data, index }) => {
                        return data?.image?.alt || `Image ${String(index).padStart(2, '0')}`;
                    },
                }
            }
        }
    ]
}

export default About;