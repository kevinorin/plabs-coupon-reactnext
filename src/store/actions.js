import { createAction } from "@reduxjs/toolkit";

/** Reset app data (ie. after logout) */
const resetAppAction = createAction("resetApp");

export { resetAppAction };
