import { CollectionAfterChangeHook } from "payload/types";
import { formatEmails } from "./utilities/formatEmails";
import { getContacts } from "./utilities/getContacts";
import { sendEmails } from "./utilities/sendEmails";

const publish: CollectionAfterChangeHook = async ({ req: { payload }, doc, operation }) => {
    if (operation !== "create") return;

    try {
        const newspaper = await payload.findByID({
            collection: "media",
            id: doc?.newspaper,
        });

        if (!newspaper?.url) throw new Error("Unable to get newspaper media");

        const site = await payload.findByID({
            collection: "sites",
            id: doc?.sites,
        });

        if (!site?.name || !site?.url || !site?.listId) throw new Error("Unable to get site");

        const contacts = await getContacts(site?.listId);

        if (!contacts) throw new Error("No contacts found");

        const emailsToSend = formatEmails(doc, site, newspaper, contacts);

        if (!emailsToSend) throw new Error("Unable to format emails");

        const { status, response } = await sendEmails(emailsToSend);

        if (status !== 200) throw new Error(response);
        else return;
    } catch (err) {
        payload.logger.error(err);
        return;
    }
}   

export default publish;