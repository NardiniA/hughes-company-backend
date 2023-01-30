import { Payload } from "payload";
import { formatPagePath } from "./formatPagePath";

export const regenPage = async ({
    doc,
    collection,
    payload
}: {
    doc: any,
    collection: string,
    payload: Payload
}): Promise<void> => {
    if (collection === "sites") {
        try {
            const res = await fetch("");

            if (res.ok) {
                payload.logger.info(`Rebuilding site`);
            }
            else {
                payload.logger.error(`Error rebuilding site`);
            }
        } catch (err) {
            payload.logger.error(`Error hitting rebuilding site`);
        }
    }

    const path = await formatPagePath(collection, doc);

    const site = await payload.findByID({
        collection: "sites",
        id: doc?.sites || doc?.sites[0],
    });

    if (!site) {
        payload.logger.error("Unable to get document site");
        return;
    }

    try {
        const res = await fetch(`${site?.url}/api/revalidate?secret=${process.env.PAYLOAD_PRIVATE_NEXTJS_REVALIDATE_KEY}&path=${path?.join()}`);

        if (res.ok) {
            payload.logger.info(`Revalidated path ${path}`);
            console.log(await res.json());
        }
        else {
            payload.logger.error(`Error revalidating path ${path}`);
        }
    } catch (err) {
        payload.logger.error(`Error hitting revalidate path ${path}`);
    }

    return;
}