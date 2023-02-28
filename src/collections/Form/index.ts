import { CollectionConfig } from "payload/types";
import { isAdminOrEditor } from "../../access/isAdminOrEditor";
import { regenAllSites } from "../../utilities/regenAllSites";

const Form: Partial<CollectionConfig> = {
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    defaultColumns: ["title", "fields", "submitButtonLabel"],
    group: "Content",
  },
  hooks: {
    afterChange: [
      ({ req: { payload } }) => {
        regenAllSites({
          payload,
        });
      }
    ]
  },
  fields: [
    {
      name: "submitType",
      label: "Submit Type",
      type: "radio",
      options: [
        {
          label: "Email",
          value: "email",
        },
        {
          label: "Subscribe Postal",
          value: "subscribe-postal",
        },
      ],
      defaultValue: "email",
      required: true,
      admin: {
        layout: "horizontal",
      },
    }
  ],
};

export default Form;
