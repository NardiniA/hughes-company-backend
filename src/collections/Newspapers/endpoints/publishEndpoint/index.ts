import { Endpoint } from "payload/config";
import { getContacts } from "../../hooks/publish/utilities/getContacts";
import { formatEmails } from "../../hooks/publish/utilities/formatEmails";
import { sendEmails } from "../../hooks/publish/utilities/sendEmails";

const publish: Endpoint = {
    path: "/actions/publish",
    method: "post",
    handler: async ({ body, payload }, res, next) => {
        const { secret, id } = body;

        try {

            if (!secret || secret !== process.env.PAYLOAD_API_KEY) throw new Error("Invalid token");
            if (!id) throw new Error("No id param found");

            const newspaper = await payload.findByID({
                collection: "newspapers",
                id: String(id),
            });

            if (!newspaper) throw new Error("No newspaper found");

            const contacts = await getContacts(newspaper?.sites?.listId);

            if (!contacts) throw new Error("No contacts found");

            const emailsToSend = formatEmails(newspaper, newspaper?.sites, newspaper?.newspaper, contacts);

            if (!emailsToSend) throw new Error("Unable to format emails");

            const { status, response } = await sendEmails(emailsToSend);

            if (status !== 200) throw new Error(response);
            else return res.status(200).json({ published: true });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: err?.cause?.req?.statusText || err || "Interal Server Error", error: err })
        }
    },
}

export default publish;