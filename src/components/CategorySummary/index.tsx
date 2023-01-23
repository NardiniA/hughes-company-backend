import React, { useEffect, useState } from "react";
import qs from "qs";
import { useDocumentInfo } from "payload/dist/admin/components/utilities/DocumentInfo";

const get = (url: string, params: unknown = {}): Promise<Response> => {
    const query = qs.stringify(params, { addQueryPrefix: true });
    return fetch(`${url}${query}`);
};

/**
 * A custom UI component for the category to display count of posts and add links
 * @constructor
 */

const CategorySummary: React.FC = () => {
    const { id } = useDocumentInfo();

    const [isLoading, setIsLoading] = useState(true);
    const [postCount, setPostCount] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) {
            const queryRelations = async () => {
                const request = get("/api/posts", {
                    where: {
                        categories: { in: id },
                    },
                    depth: 0,
                    limit: 0,
                });

                const result = await (await request).json();

                if (result?.docs) setPostCount(result?.totalDocs);

                if (result?.status > 400) setError(true);

                setIsLoading(false);
            };

            const ignoreResult = queryRelations();
        }
    }, [id]);

    if (!id) return null;

    if (error) {
        return (<span>There was a problem fetching data</span>);
    }

    return (
        <div style={{ marginTop: "3rem" }}>
            <h4>
                Summary
            </h4>
            {isLoading ? (
                <p>
                    loading...
                </p>
            ) : (
                <p>
                    {/* collection index filters use url params to allow linking to queries */}
                    <a href={`/admin/collections/posts?where[or][0][and][0][category][in][0]=${id}`} >
                        {postCount}
                        {' '}
                        Posts
                    </a>
                </p>
            )}
        </div>
    );
};

export default CategorySummary;
