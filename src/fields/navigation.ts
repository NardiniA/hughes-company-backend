import { Field } from "payload/types";
import link from "./link";
import { MenuLink } from "../blocks/MenuColumnBlocks/MenuLink";
import deepMerge from "../utilities/deepMerge";

type Navigation = (overrides?: Partial<Field>) => Field;

const menuColumnBlocks = [
    MenuLink,
]

const navigation: Navigation = (overrides): Field => deepMerge<Field, Partial<Field>>(
    {
        name: "items",
        label: "Navigation",
        type: "array",
        minRows: 1,
        fields: [
            {
                name: 'type',
                type: 'radio',
                defaultValue: 'link',
                admin: {
                    layout: 'horizontal',
                },
                options: [
                    {
                        label: 'Link',
                        value: 'link',
                    },
                    {
                        label: 'Sub-menu',
                        value: 'subMenu',
                    },
                ],
            },
            {
                name: "label",
                label: "Label",
                type: "text",
                required: true,
            },
            {
                name: "subMenu",
                label: false,
                type: "group",
                admin: {
                    condition: (_, { type } = {}) => type === "subMenu", 
                },
                fields: [
                    {
                        name: "blocks",
                        label: "Menu Blocks",
                        labels: {
                            singular: "Menu Block",
                            plural: "Menu Blocks",
                        },
                        type: "blocks",
                        blocks: menuColumnBlocks,
                    },
                ],
            },
            link({
                appearances: false,
                disableLabel: true,
                overrides: {
                    admin: {
                        condition: (_, { type }) => type === "link", 
                    }
                }
            })
        ],
    },
    overrides,
);

export default navigation;