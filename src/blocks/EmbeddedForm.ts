import { Block } from "payload/types";

const EmbeddedForm: Block = {
    slug: "embedded-form",
    fields: [
        {
            name: "form",
            label: "Form",
            type: "relationship",
            relationTo: "forms",
            required: true,
        },
    ],
};

export default EmbeddedForm;