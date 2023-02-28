import { Payload } from "payload";

export const regenAllSites = async ({
  payload,
}: {
  payload: Payload;
}): Promise<void> => {
    const sites = await payload.find({
        collection: "sites",
    });

    if (!sites?.docs?.length) {
        payload.logger.error("No sites found");
        return;
    };

    await sites?.docs?.map(async ({ name, deployHook }) => {
        try {
            const res = await fetch(deployHook);
            
            if (res.ok) {
                payload.logger.success(`Revalidated Site: ${name}`);
                return;
            } else throw new Error(`Error revalidating site: ${name}`);
        } catch (err) {
            payload.logger.error(err);
            return;
        }
    });

    return;
};
