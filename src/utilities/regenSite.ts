import { Payload } from "payload";

export const regenSite = async ({
  doc,
  collection,
  payload,
}: {
  doc: any;
  collection: string;
  payload: Payload;
}): Promise<void> => {
    let deployHook;

    if (collection !== "sites") {
        const site = await payload.findByID({
            collection: "sites",
            id: doc?.sites || doc?.sites[0],
        });

        deployHook = site?.deployHook;
    }
    else {
        deployHook = doc?.deployHook;
    }

    if (!deployHook) {
        payload.logger.error("No deploy hook found");
        return;
    };
    
    try {
        const res = await fetch(deployHook);

        if (res.ok) {
            payload.logger.info("Revalidated site");
        }
        else {
            payload.logger.error("Error revalidating site");
        }
    } catch (err) {
        payload.logger.error("Error hitting revalidating site");
    }

    return;
};
