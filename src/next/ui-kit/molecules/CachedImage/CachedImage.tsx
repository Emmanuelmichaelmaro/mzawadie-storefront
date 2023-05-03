// @ts-nocheck
import NoPhoto from "@images/no-photo.svg";
import { PlaceholderImage } from "@mzawadie/ui-kit/atoms";
import { useNetworkStatus } from "@mzawadie/ui-kit/hooks";
import { IImage } from "@next/types";
import Image from "next/image";
import React from "react";

export const CachedImage: React.FC<IImage> = ({ url, url2x, alt, children, defaultImage = NoPhoto, ...props }: IImage) => {
    const [isUnavailable, setUnavailable] = React.useState(false);
    const { online } = useNetworkStatus();

    React.useEffect(() => {
        updateAvailability();
    }, [online]);

    async function updateAvailability() {
        let _isUnavailable = false;

        if ("caches" in window) {
            if (!online) {
                const match = await window.caches.match(url!);
                let match2x;
                if (url2x) {
                    match2x = await window.caches.match(url2x);
                }
                if (!match && !match2x) {
                    _isUnavailable = true;
                }
            }
        }

        if (isUnavailable !== _isUnavailable) {
            setUnavailable(_isUnavailable);
        }
    }

    if (!url || isUnavailable) {
        return children || <PlaceholderImage alt={alt} />;
    }

    return (
        <img
            {...props}
            src={url}
            srcSet={url2x ? `${url} 1x, ${url2x} 2x` : `${url} 1x`}
            alt={alt}
            // layout="fill"
            // navigator.onLine is not always accurate
            onError={() => setUnavailable(true)}
        />
    );
};
