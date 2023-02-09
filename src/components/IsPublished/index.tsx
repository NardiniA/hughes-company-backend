import React from "react";
import { Banner } from "payload/components";

const IsPublished: React.FC = () => {
    return (
    <Banner
        className="w-100 text-left justify-content-between"
        type="info"
    >
        Newspaper has been published!
    </Banner>
    );
};

export default IsPublished;
