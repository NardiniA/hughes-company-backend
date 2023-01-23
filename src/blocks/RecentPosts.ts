import { Block } from "payload/types";

const RecentPosts: Block = {
    slug: "recent_posts",
    labels: {
        singular: "Recent Post",
        plural: "Recent Posts",
    },
    fields: [
        {
            name: "title",
            label: "Title",
            type: "text",
            required: true,
        },
    ],
}

export default RecentPosts
