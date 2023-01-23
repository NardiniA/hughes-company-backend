import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrEditor } from "../access/isAdminOrEditor";
import sites from "../fields/sites";
import url from "../fields/url";

const Advertising: CollectionConfig = {
    slug: "advertising",
    labels: {
        singular: "Advert",
        plural: "Adverts",
    },
    access: {
        read: () => true,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdmin,
    },
    admin: {
        useAsTitle: "name",
        defaultColumns: [
            "name",
            "sites",
        ],
        group: "Today",
    },
    fields: [
        {
            type: "row",
            fields: [
                {
                    name: "name",
                    label: "Name",
                    type: "text",
                    required: true,
                    admin: {
                        width: "50%",
                    },
                },
                url({
                    admin: {
                        width: "50%",
                    },
                }),
            ],
        },
        
        {
            name: "description",
            label: "Description",
            type: "textarea",
            required: true,
        },
        {
            name: "image",
            label: "Advert Image",
            type: "upload",
            relationTo: "media",
            required: true,
        },
        sites(),
    ],
}

export default Advertising;