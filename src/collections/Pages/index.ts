import { CollectionConfig } from "payload/types";
import { isAdminOrEditor } from "../../access/isAdminOrEditor";
import { isAdminOrHasSiteAccess } from "../../access/isAdminOrHasSiteAccess";
import populateFullTitle from "./hooks/populateFullTitle";
import slug from "../../fields/slug";
import hero from "../../fields/hero";
import About from "../../blocks/About";
import RichText from "../../blocks/RichText";
import RecentPosts from "../../blocks/RecentPosts";
import sites from "../../fields/sites";
import Form from "../../blocks/Form";
import EmbeddedForm from "../../blocks/EmbeddedForm";
import getBySlug from "../../endpoints/getBySlug";
import getDocsBySite from "../../endpoints/getDocsBySite";
import { isAdminOrHasSiteAccessOrPublished } from "../../access/isAdminOrHasSiteAccessOrPublished";
import { regenPage } from "../../utilities/regenPage";
import EmbeddedFrame from "../../blocks/EmbeddedFrame";
import Cards from "../../blocks/Cards";

const Pages: CollectionConfig = {
    slug: "pages",
    admin: {
        useAsTitle: "title",
        group: "Content",
        defaultColumns: [
            "fullTitle",
            "sites",
            "createdAt",
        ],
    },
    access: {
        read: isAdminOrHasSiteAccessOrPublished(),
        create: isAdminOrEditor,
        update: isAdminOrHasSiteAccess,
        delete: isAdminOrHasSiteAccess,
    },
    endpoints: [
        getBySlug(),
        getDocsBySite(),
    ],
    hooks: {
        afterChange: [
            ({ req: { payload }, doc }) => {
                regenPage({
                    doc,
                    collection: "pages",
                    payload
                });
            }
        ],
    },
    fields: [
        {
            name: "title",
            label: "Page Title",
            type: "text",
            required: true,
        },
        {
            type: "tabs",
            tabs: [
                {
                    label: "Hero",
                    fields: [
                        hero,
                    ],
                },
                {
                    label: "Page Layout",
                    fields: [
                        {
                            name: "layout",
                            label: "Sections",
                            type: "blocks",
                            minRows: 1,
                            blocks: [
                                About,
                                Cards,
                                EmbeddedForm,
                                EmbeddedFrame,
                                Form,
                                RecentPosts,
                                RichText,
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "fullTitle",
            label: "Full Title",
            type: "text",
            hooks: {
                beforeChange: [
                   populateFullTitle
                ],
            },
            admin: {
                components: {
                    Field: () => null,
                },
            },
        },
        {
            name: "breadcrumbs",
            type: "array",
            fields: [
                {
                    name: "doc",
                    type: "relationship",
                    relationTo: "pages",
                    maxDepth: 0,
                    admin: {
                        disabled: true,
                    },
                },
                {
                    type: "row",
                    fields: [
                        {
                            name: "url",
                            label: "URL",
                            type: "text",
                            admin: {
                                width: "50%",
                            },
                        },
                        {
                            name: "label",
                            type: "text",
                            admin: {
                                width: "50%",
                            },
                        },
                    ],
                },
            ],
            admin: {
                disabled: true,
            },
        },
        slug(),
        {
            name: 'parent',
            label: 'Parent Page',
            type: 'relationship',
            relationTo: 'pages',
            maxDepth: 0,
            // telling Payload to add an index to a field instructs the database to create it for enhanced query performance
            index: true,
            admin: {
                position: 'sidebar',
            },
        },
        sites({
            hasMany: false,
        }),
    ],
}

export default Pages;
