// @ts-nocheck
import { ssrMode } from "@mzawadie/core/constants";
import { createBrowserHistory, History } from "history";

const history = (() => {
    if (ssrMode) {
        return {};
    }

    const history = createBrowserHistory();

    history.listen((_location, action: any) => {
        if (["PUSH"].includes(action)) {
            window.scroll({
                behavior: "smooth",
                top: 0,
            });
        }
    });

    return history;
})() as History;

export { history };
