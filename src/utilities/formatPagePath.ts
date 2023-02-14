import payload from "payload";

const getTodayTagsPosts = async (doc: any): Promise<string[]> => {
    const tags = await payload.find({
        collection: "today-categories",
        where: {
            id: {
                in: [doc?.categories],
            },
        },
        limit: 10_000,
    });

    if (tags?.totalDocs > 0) {
        const newPaths = tags?.docs?.map(({ slug }) => `/today/tags/${slug}`);

        return ["/today", "/today/tags", ...newPaths];
    }
    return ["/today", "/today/tags"];
}

export const formatPagePath = async (collection: string, doc: any): Promise<string[]> => {    
    const paths: string[] = [];
    const { slug } = doc;

    let prefix = "";
    
    if (collection) {
        switch (collection) {
            case "pages":
                prefix = "";
                break;
            case "posts":
                prefix = "/today";
                const todayPaths = await getTodayTagsPosts(doc);
                paths.push(...todayPaths);
                break;
            case "newspapers":
                prefix = "/newspapers";
                paths.push("/newspapers");
                break;
            case "coffee-break":
                console.log(doc);
                prefix = `/coffee-break/${doc?.type}`;
                paths.push("/coffee-break", `/coffee-break/${doc?.type}`);
                break;
            default: 
                prefix = `/${collection}`;
                break;
        }
    }
    
    return [`${prefix}/${collection === "newspapers" ? doc?.issue : slug}`, "/", ...paths];
}