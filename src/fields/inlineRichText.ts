import { Field } from "payload/types";
import deepMerge from "../utilities/deepMerge";

type InlineRichText = (overrides?: Partial<Field>) => Field;

const inlineRichText: InlineRichText = (overrides) => deepMerge<Field, Partial<Field>>(
    {
        name: "inlineRichText",
        type: "richText",
        required: true,
        admin: {
            elements: [
                "link",
                "ol",
                "ul",
            ],
            leaves: [
                "bold",
                "italic",
                "strikethrough",
                "underline"
            ],
        },
    },
    overrides
);

export default inlineRichText;