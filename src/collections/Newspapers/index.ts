import { CollectionConfig } from "payload/types";
import { isAdminOrHasSiteAccess } from "../../access/isAdminOrHasSiteAccess";
import { isAdminOrHasSiteAccessOrPublished } from "../../access/isAdminOrHasSiteAccessOrPublished";
import sites from "../../fields/sites";
import url from "../../fields/url";
import { regenPage } from "../../utilities/regenPage";
import getByIssue from "./endpoints/getByIssue";
import subscribe from "./endpoints/subscribe";
import publish from "./hooks/publish";
import Publish from "../../components/Publish";
import publishEndpoint from "./endpoints/publishEndpoint";
import populateFullTitle from "./hooks/populateFullTitle";
import IsPublished from "../../components/IsPublished";

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
  endpoints: [getByIssue, subscribe, publishEndpoint],
  hooks: {
    beforeChange: [publish],
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
            d.setHours(0, 0, 0, 0);
            return d;
          },
          admin: {
            width: "50%",
            date: {
              pickerAppearance: "monthOnly",
              displayFormat: "MM/yyyy",
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
        description: "Has this newspaper already been published before?",
        condition: (data) => {
          if (!!data?.published) return false;
          return true;
        },
      },
      defaultValue: false,
    },
    {
      name: "publishManually",
      type: "ui",
      admin: {
        position: "sidebar",
        components: {
          Field: Publish,
        },
        condition: (_, siblingData) => !siblingData?.published,
      },
    },
    {
      name: "isPublished",
      type: "ui",
      admin: {
        position: "sidebar",
        components: {
          Field: IsPublished,
        },
        condition: (_, siblingData) => !!siblingData?.published,
      },
    },
  ],
};

export default Newspapers;