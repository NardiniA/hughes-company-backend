import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrEditor } from "../access/isAdminOrEditor";

const FormSubmissions: Partial<CollectionConfig> = {
    access: {
        // Only Admins and editors can read
        read: isAdminOrEditor,
        // Anyone can create
        create: () => true,
        // No one can update
        update: () => false,
        // Only admins can delete
        delete: isAdmin,
        admin: isAdminOrEditor,
    },
    admin: {
        group: "Admin",
    },
}

export default FormSubmissions;