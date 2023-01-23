import { Block } from "payload/types";
import { required, nameAndLabel, size } from "../../../fields/form";

const Checkbox: Partial<Block> = {
  imageURL: "https://res.cloudinary.com/antonio-nardini/image/upload/c_scale,w_140/v1673524926/Payload/FieldSamples/CheckboxFieldSample_jflcq0.jpg",
  imageAltText: "Checkbox field example",
  fields: [
    nameAndLabel,
    size,
    {
      type: "row",
      fields: [
        {
          ...required,
          admin: {
            width: "50%",
          },
        },
        {
          name: "default",
          label: "Default Value",
          type: "checkbox",
          admin: {
            width: "50%",
          },
        }
      ]
    },
  ],
};

export default Checkbox;