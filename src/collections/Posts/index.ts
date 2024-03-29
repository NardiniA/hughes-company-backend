import payload from "payload";
import { CollectionConfig } from "payload/types";
import { isAdminOrEditor } from "../../access/isAdminOrEditor";
import sites from "../../fields/sites";
import slug from "../../fields/slug";
import getBySlug from "../../endpoints/getBySlug";
import getDocsBySite from "../../endpoints/getDocsBySite";
import { regenPage } from "../../utilities/regenPage";
import { isAdminOrHasSiteAccessOrPublished } from "../../access/isAdminOrHasSiteAccessOrPublished";

const Posts: CollectionConfig = {
    slug: "posts",
    admin: {
        useAsTitle: "title",
        defaultColumns: [
            "title",
            "publishDate",
            "_status",
            "sites",
        ],
        group: "Today",
    },
    access: {
        read: isAdminOrHasSiteAccessOrPublished(true),
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdminOrEditor,
    },
    labels: {
        singular: "Post",
        plural: "Posts",
    },
    endpoints: [
        getBySlug("posts"),
        getDocsBySite("posts"),
    ],
    versions: {
        drafts: true,
    },
    hooks: {
        afterChange: [
            ({ req: { payload }, doc }) => {
                regenPage({
                    doc,
                    collection: "posts",
                    payload
                });
            }
        ],
    },
    fields: [
        {
            name: "title",
            label: "Title",
            type: "text",
            required: true,
        },
        {
            name: "description",
            label: "Description",
            type: "textarea",
            required: true,
        },
        {
            name: "image",
            label: "Image",
            type: "upload",
            relationTo: "media",
            required: true,
        },
        {
            name: "content",
            label: "Content",
            type: "richText",
            required: true,
        },
        slug(),
        {
            name: "publishDate",
            label: "Publish Date",
            type: "date",
            defaultValue: () => (new Date()),
            required: true,
            admin: {
                position: "sidebar",
                description: "Posts will not be public until this date",
            },
        },
        {
            name: "categories",
            label: "Categories",
            type: "relationship",
            relationTo: "today-categories",
            hasMany: true,
            required: true,
            admin: {
                position: "sidebar",
                isSortable: true,
            },
        },
        sites(),
        {
            name: "advertising",
            label: "Advertising",
            type: "relationship",
            relationTo: "advertising",
            hasMany: true,
            required: true,
            min: 1,
            max: 3,
            admin: {
                isSortable: true,
            },
            validate: (val) => {
                if (val?.length === 3) return true;
                return "Must have 3 adverts."; 
            },
        }
    ],
}

export default Posts;