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
    const path = formatPagePath(collection, doc);

    try {
        const res = await fetch(`${process.env.PAYLOAD_APP_URL}/api/revalidate?secret=${process.env.PAYLOAD_PRIVATE_NEXTJS_REVALIDATE_KEY}&path=${path}`);

        if (res.ok) {
            payload.logger.info(`Revalidated path ${path}`);
        }
        else {
            payload.logger.error(`Error revalidating path ${path}`);
        }
    } catch (err) {
        payload.logger.error(`Error hitting revalidate path ${path}`);
    }
}