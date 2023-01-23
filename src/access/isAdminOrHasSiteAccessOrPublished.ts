import { Access } from "payload/config";

export const isAdminOrHasSiteAccessOrPublished = (isDraft: boolean = false): Access => ({ req: { user } }) => {
    // User is logged in?
    if (user) {

        // Is user is an admin?
        if (user?.roles?.includes("admin")) return true;
        
        // Is user an editor and have access to sites?
        if (user?.roles?.includes("editor") && user?.sites?.length > 0) {
            // Return documents linked to user's sites
            return {
                or: [
                    {
                        sites: {
                            in: user.sites
                        }
                    },
                    {
                        sites: {
                            exists: false,
                        }
                    }
                ]
            };
        }
    }

    // Is drafting enabled on this collection?
    if (isDraft) {
        return {
            and: [
                {
                    publishDate: {
                        less_than: new Date().toJSON(),
                    },
                    _status: {
                        equals: 'published',
                    },
                }
            ]
        }
    } else {
        // Otherwise no restrictions
        return true;
    }
}