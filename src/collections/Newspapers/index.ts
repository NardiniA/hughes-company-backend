import { CollectionConfig } from "payload/types";
import { isAdminOrHasSiteAccess } from "../../access/isAdminOrHasSiteAccess";
import { isAdminOrHasSiteAccessOrPublished } from "../../access/isAdminOrHasSiteAccessOrPublished";
import sites from "../../fields/sites";
import url from "../../fields/url";
import { regenPage } from "../../utilities/regenPage";
import getByIssue from "./endpoints/getByIssue";
import subscribe from "./endpoints/subscribe";
import publish from "./endpoints/publish";
import populateFullTitle from "./hooks/populateFullTitle";
import Publish from "../../components/Publish";

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
    defaultColumns: ["fullTitle", "issue", "published", "sites"],
    group: "Content",
  },
  endpoints: [getByIssue, subscribe, publish],
  hooks: {
    afterChange: [
      ({ req: { payload }, doc }) => {
        regenPage({
          doc,
          collection: "newspapers",
          payload,
        });
      },
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
        beforeChange: [populateFullTitle],
      },
      admin: {
        components: {
          Field: () => null,
        },
      },
    },
    sites({
      hasMany: false,
    }),
    {
      name: "published",
      label: "Published",
      type: "checkbox",
      admin: {
        position: "sidebar",
        readOnly: true,
        components: {
          Field: () => null,
        }
      },
      defaultValue: false,
    },
    {
      name: "publishButton",
      type: "ui",
      admin: {
        position: "sidebar",
        components: {
          Field: Publish
        },
        condition: (data, siblingData) => !siblingData?.published,
      },
    },
  ],
};

export default Newspapers;