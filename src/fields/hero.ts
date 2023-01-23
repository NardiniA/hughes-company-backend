import { Field } from "payload/types";
import banner from "./banner";
import pageHeader from "./pageHeader";

const hero: Field = {
    name: "hero",
    label: false,
    type: "group",
    fields: [
        {
            name: "type",
            label: "Type",
            type: "select",
            options: [
                {
                    label: "Banner",
                    value: "banner"
                },
                {
                    label: "Page Header",
                    value: "pageHeader"
                },
            ],
            defaultValue: "pageHeader",
            required: true,
        },
        banner({
            admin: {
                condition: (_, { type }) => type === "banner",
            },
        }),
        pageHeader({
            admin: {
                condition: (_, { type }) => type === "pageHeader",
            },
        }),
    ],
}

export default hero;
