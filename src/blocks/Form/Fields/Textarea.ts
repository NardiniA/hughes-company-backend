import { Block } from "payload/types";
import { required, nameAndLabel, placeholderAndDefault, size } from "../../../fields/form";

const Textarea: Partial<Block> = {
  imageURL: "https://res.cloudinary.com/antonio-nardini/image/upload/c_scale,w_140/v1673524925/Payload/FieldSamples/MessageFieldSample_bkdzde.jpg",
  imageAltText: "Textarea field example",
  fields: [
    nameAndLabel,
    placeholderAndDefault,
    size,
    required,
  ],
};

export default Textarea;