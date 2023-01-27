import { CollectionConfig } from "payload/types";
import { isAdminOrEditor } from "../../access/isAdminOrEditor";
import { isAdminOrHasSiteAccess } from "../../access/isAdminOrHasSiteAccess";
import { isAdminOrHasSiteAccessOrPublished } from "../../access/isAdminOrHasSiteAccessOrPublished";
import getBySlug from "../../endpoints/getBySlug";
import sites from "../../fields/sites";
import slug from "../../fields/slug";
import url from "../../fields/url";
import getByType from "./endpoints/getByType";

const CoffeeBreak: CollectionConfig = {
  slug: "coffee-break",
  labels: {
    singular: "Coffee Break",
    plural: "Coffee Breaks",
  },
  access: {
    read: isAdminOrHasSiteAccessOrPublished(),
    create: isAdminOrEditor,
    update: isAdminOrHasSiteAccess,
    delete: isAdminOrHasSiteAccess,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: [
        "title",
        "sites",
        "type"
    ],
    group: "Content",
  },
  endpoints: [
    getByType,
    getBySlug("coffee-break"),
  ],
  fields: [
    {
        name: "title",
        label: "Title",
        type: "text",
        required: true,
    },
    slug(),
    {
        name: "type",
        label: "Type",
        type: "radio",
        options: [
            {
                label: "Crosswords",
                value: "crosswords",
            }, 
            {
                label: "Jigsaws",
                value: "jigsaws",
            }, 
            {
                label: "Wordsearch",
                value: "wordsearch",
            }, 
        ],
        admin: {
            layout: "horizontal",
        },
        required: true,
        defaultValue: "crosswords",
    },
    {
        name: "crosswords",
        type: "group",
        fields: [
            {
                name: "puzzleId",
                label: "Puzzle ID",
                type: "number",
                required: true,
            },
        ],
        admin: {
            condition: (_, siblingData) => siblingData?.type === "crosswords",
        }
    },
    {
        name: "jigsaws",
        type: "group",
        fields: [
            url({
                name: "jigsawUrl",
                label: "Jigsaw URL"
            }),
        ],
        admin: {
            condition: (_, siblingData) => siblingData?.type === "jigsaws",
        }
    },
    {
        name: "wordsearch",
        type: "group",
        fields: [
            {
                name: "puzzleId",
                label: "Puzzle ID",
                type: "number",
                required: true,
            },
        ],
        admin: {
            condition: (_, siblingData) => siblingData?.type === "wordsearch",
        }
    },
    sites(),
  ],
};

export default CoffeeBreak;