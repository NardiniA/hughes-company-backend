import { Access } from "payload/config";
import { User } from "../payload-types";

export const isLoggedInOrPublished: Access<any, User> = ({ req: { user }}) => {
    // Is user logged in?
    if (user) {
        return true;
    }

    // No user. Is the doc published?
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
}
