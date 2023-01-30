const formatPath = (collection: string, doc:any): string => { 
    const { slug } = doc;

    let prefix = "";
    
    if (collection) {
        switch (collection) {
            case "pages":
                prefix = "";
                break;
            case "posts":
                prefix = "/today";
                break;
            case "today-categories":
                prefix = "/today/tags";
                break;
            case "newspapers":
                prefix = "/newspapers";
                break;
            case "coffee-break":
                console.log(doc);
                prefix = `/coffee-break/${doc?.type}`;
                break;
            default: 
                prefix = `/${collection}`;
                break;
        }
    }
    
    return `${prefix}/${collection === "newspapers" ? doc?.issue : slug}`;
}

export const formatPreviewURL = (collection: string, doc: any): string => {
    const ut_id = "63b6b890bd32ff519db61b6d"
    const base =
      (doc?.sites === ut_id || doc?.sites?.includes(ut_id))
        ? "http://localhost:3001"
        : "https://pershore-times.vercel.app";
    return `${base}/api/preview?url=${formatPath(collection, doc)}`;
}