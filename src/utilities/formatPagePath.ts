export const formatPagePath = (collection: string, doc: any): string => {
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
            default: 
                prefix = `/${collection}`;
                break;
        }
    }

    return `${prefix}/${slug}`;
}