import { Block } from "payload/types";
import link from "../fields/link";
import url from "../fields/url";

const Cards: Block = {
    slug: "cards",
    labels: {
        singular: "Card",
        plural: "Cards",
    },
    fields: [
        {
            name: "cards",
            label: "Cards",
            type: "array",
            required: true,
            fields: [
                {
                    name: "name",
                    label: "Name",
                    type: "text",
                    required: true,
                },
                link({
                    appearances: false,
                    disableLabel: true,
                }),
            ],
            admin: {
                components: {
                    RowLabel: ({ data, index }) => {
                        return data?.name || `Slide ${String(index).padStart(2, '0')}`;
                    },
                }
            }
        }
    ]
}

export default Cards;