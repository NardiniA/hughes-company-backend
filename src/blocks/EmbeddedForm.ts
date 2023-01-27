import { Block } from "payload/types";

const EmbeddedForm: Block = {
  slug: "embedded-form",
  labels: {
    singular: "Embedded Form",
    plural: "Embedded Forms",
  },
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