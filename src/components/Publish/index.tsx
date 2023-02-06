import React, { useState } from "react";
import { Banner, Button, X } from "payload/components";
import { useDocumentInfo } from "payload/dist/admin/components/utilities/DocumentInfo";

const Publish: React.FC = () => {
  const { id, publishedDoc } = useDocumentInfo();

  const [showbanner, setShowBanner] = useState<boolean>(false);
  const [banner, setBanner] = useState<{
    type: "error" | "success" | "info" | "default";
    text: string;
  }>({
    type: "info",
    text: "Newspaper sent out!",
  });

  const onClose = () => {
    setShowBanner(false);
  }

  const handleClick = async (): Promise<void> => {
    setShowBanner(false);

    try {
        const req = await fetch(`/api/newspapers/actions/publish`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            secret: "sRpnVhSIazGSxahPu5huJRwSoXIb64kRCsFWsBVC8Zg",
          }),
        });

        if (!req?.ok) throw new Error("Unable to publish newspaper", {
            cause: {
                req,
            },
        });

        const res = await req.json();

        if (!!res?.published) {
            setBanner({
                type: "success",
                text: "Newspaper published!",
            });
        } else {
            setBanner({
                type: "error",
                text: "Unable to publish newspaper",
            });
        }
    } catch (err) {
        console.error(err);
        setBanner({
            type: "error",
            text: err?.cause?.req?.statusText || "Unable to publish newspaper",
        });
    }

    setShowBanner(true);
    return;  
  };

  if (!!publishedDoc) return (
    <>
      <Button
        className="w-100"
        type="button"
        el="button"
        onClick={handleClick}
        tooltip="Send out newspaper email marketing"
        buttonStyle="secondary"
      >
        Publish
      </Button>

      {showbanner && banner?.text && banner?.type && (
        <div>
          <Banner className="w-100 text-left justify-content-between" type={banner?.type} icon={<X />} alignIcon="right" onClick={onClose}>{banner?.text}</Banner>
        </div>
      )}
    </>
  );

  return null;
};

export default Publish;
