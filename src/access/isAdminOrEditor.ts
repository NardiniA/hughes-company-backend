import { Access } from "payload/config";

export const isAdminOrEditor: Access = ({ req: { user } }) => {
    // Is there a logged in user and are they an admin or editor
    if (user) {
        if (user?.roles?.includes("admin") || user?.roles?.includes("editor")) return true;
    }

    // Reject others
    return false;
}