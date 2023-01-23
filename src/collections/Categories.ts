import { CollectionConfig } from "payload/types";
import { isAdminOrEditor } from "../access/isAdminOrEditor";
import slug from "../fields/slug";
import getBySlug from "../endpoints/getBySlug";
import CategorySummary from "../components/CategorySummary";
import sites from "../fields/sites";

const Categories: CollectionConfig = {
    slug: "today-categories",
    admin: {
        useAsTitle: "name",
        defaultColumns: [
            "name",
            "slug",
            "sites",
        ],
        group: "Today",
    },
    access: {
        read: (): boolean => true,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdminOrEditor,
        admin: isAdminOrEditor,
    },
    labels: {
        singular: "Category",
        plural: "Categories",
    },
    endpoints: [
        getBySlug("today-categories"),
    ],
    fields: [
        {
            name: "name",
            label: "Category Name",
            type: "text",
            required: true,
        },
        slug("name"),
        sites(),
        {
            name: "summary",
            type: "ui",
            admin: {
                position: "sidebar",
                components: {
                    Field: CategorySummary,
                }
            }
        }
    ],
};

export default Categories;
