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
        if (path) {
            path.forEach(async (p) => {
                const res = await fetch(`${site?.url}/api/revalidate?secret=${process.env.PAYLOAD_PRIVATE_NEXTJS_REVALIDATE_KEY}&path=${p}`);

                if (res.ok) {
                    payload.logger.info(`Revalidated path ${p}`);
                }
                else {
                    payload.logger.error(`Error revalidating path ${p}`);
                }
            });
        }
    } catch (err) {
        payload.logger.error(`Error hitting revalidate path ${path}`);
    }

    return;
}