import { CollectionConfig } from "payload/types";
import { isAdminOrEditor } from "../access/isAdminOrEditor";
import slug from "../fields/slug";
import getBySlug from "../endpoints/getBySlug";
import CategorySummary from "../components/CategorySummary";
import sites from "../fields/sites";
import { regenPage } from "../utilities/regenPage";
import getDocsBySite from "../endpoints/getDocsBySite";

const Categories: CollectionConfig = {
  slug: "today-categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "sites"],
    group: "Today",
  },
  access: {
    read: (): boolean => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  labels: {
    singular: "Category",
    plural: "Categories",
  },
  endpoints: [getBySlug("today-categories"), getDocsBySite("today-categories")],
  hooks: {
    afterChange: [
      ({ req: { payload }, doc }) => {
        regenPage({
          doc,
          collection: "posts",
          payload,
        });
      },
    ],
  },
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
        },
      },
    },
  ],
};

export default Categories;
