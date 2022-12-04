import { onFetch } from "./onFetch.mjs";
import { onScheduled } from "./onScheduled.mjs";

export default { // define the callback function
    fetch: onFetch,
    scheduled: onScheduled,
};
