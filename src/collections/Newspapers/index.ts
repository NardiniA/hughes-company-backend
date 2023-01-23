import { CollectionConfig } from "payload/types";
import { isAdminOrHasSiteAccess } from "../../access/isAdminOrHasSiteAccess";
import { isAdminOrHasSiteAccessOrPublished } from "../../access/isAdminOrHasSiteAccessOrPublished";
import sites from "../../fields/sites";
import url from "../../fields/url";
import getByIssue from "./endpoints/getByIssue";
import subscribe from "./endpoints/subscribe";
import populateFullTitle from "./hooks/populateFullTitle";
import publish from "./hooks/publish";

const Newspapers: CollectionConfig = {
    slug: "newspapers",
    access: {
        read: isAdminOrHasSiteAccessOrPublished(),
        create: isAdminOrHasSiteAccess,
        update: isAdminOrHasSiteAccess,
        delete: isAdminOrHasSiteAccess,
    },
    admin: {
        useAsTitle: "fullTitle",
        defaultColumns: [
            "fullTitle",
            "issue",
            "sites",
        ],
        group: "Content",
    },
    endpoints: [
        getByIssue,
        subscribe,
    ],
    hooks: {
        afterChange: [
            publish
        ],
    },
    fields: [
        {
            type: "row",
            fields: [
                {
                    name: "issue",
                    label: "Issue Number",
                    type: "number",
                    required: true,
                    admin: {
                        width: "50%",
                    },
                },
                {
                    name: "publishDate",
                    label: "Publish Date",
                    type: "date",
                    defaultValue: () => {
                        const d = new Date();
                        d.setHours(0,0,0,0);
                        return d;
                    },
                    admin: {
                        width: "50%",
                        date: {
                            pickerAppearance: "monthOnly",
                        },
                    },
                },
            ],
        },
        url({
            name: "flipURL",
            label: "Flip Gorilla Link",
        }),
        {
            name: "newspaper",
            label: "Newspaper",
            type: "upload",
            relationTo: "media",
            required: true,
            filterOptions: () => {
                return {
                    mimeType: {
                        contains: "pdf",
                    },
                };
            },
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
                }
            }
        },
        sites({
            hasMany: false,
        }),
    ],
}

export default Newspapers;