import payload from "payload";
import { Endpoint } from "payload/config";
import deepMerge from "../utilities/deepMerge";

type GetBySlug = (collection?: string, overrides?: Partial<Endpoint>) => Endpoint;

const getBySlug: GetBySlug = (collection = "pages", overrides) => deepMerge<Endpoint, Partial<Endpoint>>(
    {
        path: "/get/:site/:slug",
        method: "get",
        handler: async  (req, res, next) => {
            if (!req?.params?.slug && !req?.params?.site) return res.status(400).json({ message: "No slug param found" });
            try {
                const post = await payload.find({
                    collection: collection,
                    where: {
                        sites: {
                            in: [req?.params?.site],
                        },
                        slug: {
                            equals: req?.params?.slug,
                        },
                    },
                });

                if (!post?.totalDocs) {
                    throw new Error("No document(s) found");
                }

                const doc = {
                    message: "sucess",
                    statusCode: 200,
                    document: post?.docs[0],
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

export default getBySlug;