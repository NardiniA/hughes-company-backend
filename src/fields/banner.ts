import { Field } from "payload/types";
import deepMerge from "../utilities/deepMerge";

type Banner = (overrides?: Partial<Field>) => Field;

const banner: Banner = (overrides) => deepMerge<Field, Partial<Field>>(
    {
        name: "banner",
        label: false,
        type: "group",
        fields: [
            {
                name: "title",
                label: "Title",
                type: "text",
                required: true,
            },
            {
                name: "image",
                label: "Image",
                type: "upload",
                relationTo: "media",
                required: true,
            },
        ],
    },
    overrides,
);

export default banner;
