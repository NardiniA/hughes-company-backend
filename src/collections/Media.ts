import { CollectionConfig } from "payload/types";
import { isAdminOrEditor } from "../access/isAdminOrEditor";

const Media: CollectionConfig = {
    slug: "media",
    access: {
        read: (): boolean => true,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdminOrEditor,
    },
    admin: {
        useAsTitle: "alt",
        group: "Content",
    },
    upload: {
        adminThumbnail: "card",
        imageSizes: [
            {
                name: "blur",
                width: 10,
                height: 10,
            },
            {
                name: "card",
                width: 640,
                height: 480,
            },
            {
                name: "portrait",
                width: 768,
                height: 1024,
            },
            {
                name: "square",
                width: 1200,
                height: 1200,
            },
            {
                name: "feature",
                width: 1024,
                height: 576,
            },
        ],
        disableLocalStorage: true,
    },
    fields: [
        {
            name: "alt",
            label: "Alt Text",
            type: "text",
            required: true,
            admin: {
                description: "A brief description of the uploaded media. Commonly used for screen readers and accessibility",
            },
        }
    ]
}

export default Media;
