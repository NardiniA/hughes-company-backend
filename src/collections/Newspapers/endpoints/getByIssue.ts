import payload from "payload";
import { Endpoint } from "payload/config";

const getByIssue: Endpoint = {
    path: "/get/:site/:issue",
    method: "get",
    handler: async (req, res, next) => {
        if (!req?.params?.issue && !req?.params?.site) return res.status(400).json({ message: "No issue or site param found" });
        try {
            const issue = await payload.find({
                collection: "newspapers",
                where: {
                    sites: {
                        in: [req?.params?.site],
                    },
                    issue: {
                        equals: req?.params?.issue,
                    },
                },
            });

            if (!(!!issue?.docs?.length)) {
                throw new Error("No issue found");
            }

            const doc = {
                message: "success",
                statusCode: 200,
                document: issue?.docs[0],
            };

            return res.status(200).json(doc);
        } catch (error) {
            console.error(error);
            next(error);
        }
    },
}

export default getByIssue;