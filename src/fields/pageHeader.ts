import { Field } from "payload/types";
import deepMerge from "../utilities/deepMerge";

type PageHeader = (overrides?: Partial<Field>) => Field;

const pageHeader: PageHeader = (overrides) => deepMerge<Field, Partial<Field>>(
    {
        name: "page_header",
        label: false,
        type: "group",
        fields: [
            {
                name: "title",
                label: "Title",
                type: "text",
                required: true,
            },
        ],
    },
    overrides,
);

export default pageHeader;
