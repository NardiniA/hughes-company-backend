import React, { useState } from "react";
import { Button, Banner, X } from "payload/components";
import { useDocumentInfo } from "payload/dist/admin/components/utilities/DocumentInfo";

const TriggerRebuild: React.FC = () => {
  const { publishedDoc } = useDocumentInfo();

    const [showbanner, setShowBanner] = useState<boolean>(false);
    const [banner, setBanner] = useState<{
      type: "error" | "success" | "info" | "default";
      text: string;
    }>({
      type: "info",
      text: "Newspaper sent out!",
    });

    const onClose = (): void => {
      setShowBanner(false);
    };

  const handleClick = async (): Promise<void> => {
    setShowBanner(false);

    if (!!publishedDoc?.deployHook) {
      try {
        const req = await fetch(publishedDoc?.deployHook);

        if (!req?.ok) {
          throw new Error("Unable to rebuild website", {
            cause: {
              req,
            },
          });
        }

        const res = await req.json();

        if (!!res?.job?.state) {
          setBanner({
            type: "success",
            text: "Website rebuild triggered!",
          });
        }
      } catch (err) {
        console.error(err);
        setBanner({
          type: "error",
          text: err?.cause?.req?.statusText || "Unable to rebuild website",
        });
      }
    }
    else {
      setBanner({
        type: "error",
        text: "No published document available",
      });
    }
    setShowBanner(true);
    return;
  }

  if (!!publishedDoc) return (
    <>
      <Button
        className="w-100"
        type="button"
        el="button"
        onClick={handleClick}
        tooltip="Rebuild entire website"
        buttonStyle="secondary"
      >
        Trigger Site Rebuild
      </Button>

      {showbanner && banner?.text && banner?.type && (
        <div>
          <Banner
            className="w-100 text-left justify-content-between"
            type={banner?.type}
            icon={<X />}
            alignIcon="right"
            onClick={onClose}
          >
            {banner?.text}
          </Banner>
        </div>
      )}
    </>
  );
  return null;
};

export default TriggerRebuild;
