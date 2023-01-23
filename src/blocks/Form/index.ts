import { Block } from "payload/types";

const Form: Block = {
    slug: "contact-form",
    fields: [
        {
            name: "content",
            label: "Content",
            type: "group",
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
                            "link",
                        ],
                    },
                }
            ],
        },
        {
            name: "form",
            label: "Form",
            type: "relationship",
            relationTo: "forms",
            required: true,
        },
    ],
}

export default Form;