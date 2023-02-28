import { Payload } from "payload";

const regen = async (deploy: string, payload: Payload): Promise<void> => {
    try {
      const res = await fetch(deploy);

      if (res.ok) {
        payload.logger.info("Revalidated site");
      } else {
        payload.logger.error("Error revalidating site");
      }
    } catch (err) {
      payload.logger.error("Error hitting revalidating site");
    }
}

export const regenSite = async ({
  doc,
  collection,
  payload,
}: {
  doc: any;
  collection: string;
  payload: Payload;
}): Promise<void> => {
    let deployHook: string | Array<string>;

    if (collection !== "sites") {
        if (Array.isArray(doc?.sites)) {
            const sites = await payload.find({
                collection: "sites",
                where: {
                    id: {
                        in: doc?.sites
                    }
                }
            });

            if (!sites?.docs?.length) {
                payload.logger.error("No deploy hooks found");
                return;
            }

            deployHook = sites?.docs?.map(({ deployHook }) => deployHook);
        } else {
            const site = await payload.findByID({
                collection: "sites",
                id: doc?.sites,
            });

            deployHook = site?.deployHook;
        }
    } else {
        deployHook = doc?.deployHook;
    }

    if (!deployHook) {
        payload.logger.error("No deploy hook found");
        return;
    };
    
    if (Array.isArray(deployHook)) {
        await deployHook?.map(async hook => {
            await regen(hook, payload);
        });
    } else {
        await regen(deployHook, payload);
    }
    return;
};
