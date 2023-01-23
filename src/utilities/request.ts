type Response = {
    status: number,
    response: any,
}

export const request = async (url: any, options: any): Promise<Response> => {
    try {
        const req = await fetch(url, {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "api-key": process.env.SIB_API_KEY,
          },
          ...options,
        });

        if (!req.ok) {
            console.log(await req.json());
            console.log(req);
            throw new Error("Unable to make request", {
                cause: {
                    req,
                },
            });
        }

        return {
            status: 200,
            response: await req.json()
        };
    } catch (err) {
        console.error(`Error making request - request.ts: ${err}`);
        return {
            status: err?.cause?.req?.status || 500,
            response: err?.cause?.req?.statusText || "Internal Server Error",
        };
    }
}