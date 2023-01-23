import { Block } from "payload/types";

const RichText: Block = {
  slug: "rich-text",
  labels: {
    singular: "Rich Text",
    plural: "Rich Text Blocks",
  },
  fields: [
    {
        name: "size",
        label: "Width",
        type: "select",
        required: true,
        options: [
        {
            value: "col-lg-10",
            label: "Full",
        },
        {
            value: "col-lg-8 col-md-6",
            label: "Two Thirds",
        },
        {
            value: "col-md-6",
            label: "Half",
        },
        {
            value: "col-lg-4 col-md-6",
            label: "One Third",
        },
        {
            value: "col-lg-3 col-md-6",
            label: "Quarter",
        },
        ],
        defaultValue: "col-lg-10",
    },
    {
      type: "row",
      fields: [
        {
          name: "colAlign",
          label: "Column Alignment",
          type: "select",
          options: [
            {
                value: "start",
                label: "Left",
            },
            {
                value: "center",
                label: "Center",
            },
            {
                value: "end",
                label: "Right",
            },
          ],
          defaultValue: "center",
          required: true,
          admin: {
            width: "50%",
          }
        },
        {
          name: "textAlign",
          label: "Text Alignment",
          type: "select",
          options: [
            {
                value: "start",
                label: "Left",
            },
            {
                value: "center",
                label: "Center",
            },
            {
                value: "end",
                label: "Right",
            },
          ],
          defaultValue: "start",
          required: true,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      name: "content",
      label: "Content",
      type: "richText",
      required: true,
    },
  ],
};

export default RichText;