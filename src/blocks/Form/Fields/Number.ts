import { Block } from "payload/types";
import { required, nameAndLabel, size, placeholder } from "../../../fields/form";

const Number: Partial<Block> = {
  imageURL: "https://res.cloudinary.com/antonio-nardini/image/upload/c_scale,w_140/v1673524926/Payload/FieldSamples/NumberFieldSample_s45tdc.jpg",
  imageAltText: "Numer field example",
  fields: [
    nameAndLabel,
    {
      type: "row",
      fields: [
        {
          ...placeholder,
          admin: {
            width: "50%",
          },
        },
        {
          name: "default",
          label: "Default Value",
          type: "number",
          admin: {
            width: "50%",
          },
        },
      ],
    },
    size,
    required,
  ],
};

export default Number;