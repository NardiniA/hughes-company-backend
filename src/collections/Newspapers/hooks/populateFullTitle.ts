import { FieldHook } from "payload/types";

const populateFullTitle: FieldHook = async ({ siblingData }) => {
    if (siblingData.issue && siblingData.publishDate) {
        console.log(siblingData?.publishDate);
        const formattedDate = new Date(siblingData.publishDate).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
        console.log(formattedDate);
        return `Issue ${siblingData.issue} - ${formattedDate}`;
    }

    return undefined;
}

export default populateFullTitle;