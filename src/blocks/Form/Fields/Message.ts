import { Block } from "payload/types";
import inlineRichText from "../../../fields/inlineRichText";

const Message: Partial<Block> = {
  imageURL: "https://res.cloudinary.com/antonio-nardini/image/upload/c_scale,w_140/v1673524925/Payload/FieldSamples/MessageFieldSample_bkdzde.jpg",
  imageAltText: "Message form example",
  fields: [
    inlineRichText({
      name: "message",
      label: "Message",
    }),
  ],
};

export default Message;