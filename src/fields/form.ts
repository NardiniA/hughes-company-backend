import { Field } from "payload/types";

const name: Field = {
  name: 'name',
  label: 'Name (lowercase, no special characters)',
  type: 'text',
  required: true,
};

const label: Field = {
  name: 'label',
  label: 'Label',
  type: 'text',
  required: true,
};

const placeholder: Field = {
  name: 'placeholder',
  label: 'Placeholder',
  type: 'text',
};

const size: Field = {
    name: "size",
    label: "Width",
    type: "select",
    required: true,
    options: [
        {
            value: "col-md-12",
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
    ]
}

const required: Field = {
  name: 'required',
  label: 'Required',
  type: 'checkbox',
};

const defaultValue: Field = {
  name: "default",
  label: "Default Value",
  type: "text",
};

const nameAndLabel: Field = {
    type: "row",
    fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
    ],
};

const placeholderAndSize: Field = {
    type: "row",
    fields: [
        {
            ...placeholder,
            admin: {
                width: "50%",
            },
        },
        {
            ...size,
            admin: {
                width: "50%",
            },
        },
    ],
};

const placeholderAndDefault: Field = {
  type: "row",
    fields: [
        {
            ...placeholder,
            admin: {
                width: "50%",
            },
        },
        {
            ...defaultValue,
            admin: {
                width: "50%",
            },
        },
    ],
}

export {
    name, 
    label,
    nameAndLabel,
    placeholder,
    size,
    defaultValue,
    placeholderAndDefault,
    placeholderAndSize,
    required,
}