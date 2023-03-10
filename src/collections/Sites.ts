import { CollectionConfig } from "payload/types";
import { isAdmin, isAdminFieldLevel } from "../access/isAdmin";
import { isAdminOrHasSiteAccess } from "../access/isAdminOrHasSiteAccess";
import navigation from "../fields/navigation";
import url from "../fields/url";
import payload from "payload";
import slug from "../fields/slug";
import inlineRichText from "../fields/inlineRichText";
import RowLabel from "../components/RowLabel";
import { regenSite } from "../utilities/regenSite";
import TriggerRebuild from "../components/TriggerRebuild";

const Sites: CollectionConfig = {
  slug: "sites",
  access: {
    read: ({ req: { user } }) => {
      // Need to be logged in
      if (user) {
        // If user has role of 'admin'
        if (user.roles.includes("admin")) return true;

        // If user has role of 'editor' and has access to a site,
        // return a query constraint to restrict the documents this user can edit
        // to only those that are assigned to a site, or have no site assigned
        if (user.roles.includes("editor") && user.sites?.length > 0) {
          return {
            or: [
              {
                id: {
                  in: user.sites,
                },
              },
              {
                id: {
                  exists: false,
                },
              },
            ],
          };
        }
      }

      // Reject everyone else
      return true;
    },
    create: isAdmin,
    update: isAdminOrHasSiteAccess,
    delete: () => false,
  },
  admin: {
    useAsTitle: "name",
    group: "Admin",
    defaultColumns: ["name", "url"],
    preview: ({ url }) => {
      if (url) {
        return `${url}`;
      }

      return "";
    },
  },
  labels: {
    singular: "Site",
    plural: "Sites",
  },
  endpoints: [
    {
      path: "/get/:site",
      method: "get",
      handler: async (req, res, next) => {
        if (!req?.params?.site)
          return res.status(400).json({ message: "No site param found" });
        try {
          const post = await payload.find({
            collection: "sites",
            where: {
              slug: {
                equals: req?.params?.site,
              },
            },
          });

          const doc = {
            message: "sucess",
            statusCode: 200,
            site: post?.docs[0],
          };

          return res.status(200).json(doc);
        } catch (error) {
          console.error(error);
          next(error);
        }
      },
    },
  ],
  hooks: {
    afterChange: [
      ({ req: { payload }, doc }) => {
        regenSite({
          doc,
          collection: "sites",
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
          name: "name",
          label: "Site Name",
          type: "text",
          required: true,
          admin: {
            width: "50%",
          },
        },
        url({
          name: "url",
          label: "Site URL",
          admin: {
            width: "50%",
          },
        }),
      ],
    },
    {
      name: "triggerRebuild",
      type: "ui",
      admin: {
        position: "sidebar",
        components: {
          Field: TriggerRebuild,
        },
      },
    },
    slug("name", {
      label: "Site Slug",
      unique: true,
    }),
    {
      name: "listId",
      label: "List ID",
      type: "number",
      required: true,
      admin: {
        position: "sidebar",
        description: "Sendinblue contacts list id.",
      },
      access: {
        read: isAdminFieldLevel,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
    url({
      name: "deployHook",
      label: "Deploy Hook",
      admin: {
        position: "sidebar",
        description: "Webhook to redeploy entire website.",
      },
      access: {
        read: isAdminFieldLevel,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    }),
    {
      name: "logo",
      label: "Site Logo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "nav",
      label: false,
      type: "group",
      fields: [
        navigation({
          admin: {
            components: {
              RowLabel: RowLabel,
            },
          },
        }),
      ],
    },
    {
      name: "footer",
      label: "Footer",
      type: "group",
      fields: [
        {
          name: "title",
          label: "Footer Title",
          type: "text",
          required: true,
        },
        inlineRichText({
          name: "copy",
          label: "Copyright",
          admin: {
            elements: ["link"],
          },
        }),
      ],
    },
    {
      name: "meta",
      label: "Site Information",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "metaTitle",
              label: "Meta Title",
              type: "text",
              minLength: 30,
              required: true,
              admin: {
                width: "50%",
              },
            },
            {
              name: "metaAuthor",
              label: "Meta Author",
              type: "text",
              required: true,
              admin: {
                width: "50%",
              },
            },
          ],
        },
        {
          name: "metaDescription",
          label: "Meta Description",
          type: "textarea",
          maxLength: 180,
          minLength: 100,
          required: true,
        },
        {
          name: "ogImage",
          label: "Meta Image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "metaKeywords",
          label: "Meta Keywords",
          type: "array",
          labels: {
            singular: "Keyword",
            plural: "Keywords",
          },
          minRows: 1,
          fields: [
            {
              name: "keyword",
              label: "Keyword",
              type: "text",
              required: true,
            },
          ],
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: RowLabel,
            },
          },
        },
      ],
    },
  ],
};

export default Sites;
