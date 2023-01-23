import { Field } from "payload/types";
import deepMerge from "../utilities/deepMerge";

type Sites = (overrides?: Partial<Field>) => Field;

const sites: Sites = (overrides) => deepMerge<Field, Partial<Field>>(
    {
        name: "sites",
        label: "Sites",
        type: "relationship",
        relationTo: "sites",
        required: true,
        hasMany: true,
        admin: {
            position: "sidebar",
        },
    },
    overrides,
);

export default sites;