import { FieldHook } from "payload/types";
import { format } from "date-fns"

const populateFullTitle: FieldHook = async ({ siblingData }) => {
    if (siblingData.issue && siblingData.publishDate) {
        const formattedDate = format(new Date(siblingData.publishDate), "MMMM yyyy");
        console.log(formattedDate);
        return `Issue ${siblingData.issue} - ${formattedDate}`;
    }

    return undefined;
}

export default populateFullTitle;