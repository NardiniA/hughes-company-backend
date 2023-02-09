import { CollectionBeforeChangeHook } from "payload/types";
import { getContacts } from "./utilities/getContacts";
import { formatEmails } from "./utilities/formatEmails";
import { sendEmails } from "./utilities/sendEmails";

const publish: CollectionBeforeChangeHook = async ({
    data,
    req: { payload },
    operation
}) => {
    if (operation !== "create") return data;

    try {
        const newspaper = await payload.findByID({
            collection: "media",
            id: String(data?.newspaper),
        });

        if (!newspaper) throw new Error("No newspaper found");

        const site = await payload.findByID({
            collection: "sites",
            id: String(data?.sites),
        });

        if (!site) throw new Error("No site found");

        const contacts = await getContacts(site?.listId);

        if (!contacts) throw new Error("No contacts found");

        const emailsToSend = formatEmails(data, site, newspaper, contacts);

        if (!emailsToSend) throw new Error("Unable to format emails");

        const { status, response } = await sendEmails(emailsToSend);

        if (status !== 200) throw new Error(response);
        else {
            console.log("Emails sent!");

            return {
                ...data,
                published: true,
            }
        }
    } catch (err) {
        console.error(err);
        return data;
    }
}

export default publish;