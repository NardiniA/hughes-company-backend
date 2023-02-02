import payload from "payload";
import { Endpoint } from "payload/config";
import deepMerge from "../utilities/deepMerge";

type GetDocsBySite = (collection?: string, overrides?: Partial<Endpoint>) => Endpoint;

const getDocsBySite: GetDocsBySite = (collection = "pages", overrides) => deepMerge<Endpoint, Partial<Endpoint>>(
    {
        path: "/get/:site",
        method: "get",
        handler: async  (req, res, next) => {
            if (!req?.params?.site) return res.status(400).json({ message: "No site param found" });

            try {
                const docs = await payload.find({
                    collection: collection,
                    where: {
                        sites: {
                            in: [req?.params?.site],
                        },
                    },
                    limit: +req?.params?.limit || 10_000,
                    page: +req?.params?.page || 1,
                });

                if (!(!!docs?.docs?.length)) {
                    throw new Error("No docs found");
                }

                const doc = {
                    message: "sucess",
                    statusCode: 200,
                    ...docs,
                }

                return res.status(200).json(doc);
            } catch (error) {
                console.error(error);
                next(error);
            }
        }
    },
    overrides,
);

export default getDocsBySite;
