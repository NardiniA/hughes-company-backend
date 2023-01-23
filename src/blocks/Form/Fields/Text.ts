import { Block } from "payload/types";
import { required, nameAndLabel, placeholderAndDefault, size } from "../../../fields/form";

const Text: Partial<Block> = {
  imageURL: "https://res.cloudinary.com/antonio-nardini/image/upload/c_scale,w_140/v1673524925/Payload/FieldSamples/EmailFieldSample_rpvyug.jpg",
  imageAltText: "Text field example",
  fields: [
    nameAndLabel,
    placeholderAndDefault,
    size,
    required,
  ],
};

export default Text;