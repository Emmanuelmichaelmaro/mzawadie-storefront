import { useServiceWorker } from "@mzawadie/ui-kit/hooks/useServiceWorker";
import React from "react";

import { ServiceWorkerContext } from "./context";
import { IProps } from "./types";

export const ServiceWorkerProvider: React.FC<IProps> = ({ children, timeout }) => {
    const context = useServiceWorker({ timeout });
    return <ServiceWorkerContext.Provider value={context}>{children}</ServiceWorkerContext.Provider>;
};
