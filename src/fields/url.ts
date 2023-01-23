import { Field } from "payload/types";
import deepMerge from "../utilities/deepMerge";
import { isValidURL } from "../utilities/isValidURL";

type URLField = (overrides?: Partial<Field>) => Field;

const url: URLField = (overrides) => deepMerge<Field, Partial<Field>>(
    {
        name: "url",
        label: "URL",
        type: "text",
        required: true,
        validate: (val, args) => {
            if (!(val?.length > 0)) return "This field is required.";
            
            const isUrl = isValidURL(val);

            if (isUrl) return true;
            return "Not a valid URL.";
        },
    },
    overrides,
);

export default url;