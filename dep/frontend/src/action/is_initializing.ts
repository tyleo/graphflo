import { String } from "graphflo";
import { Action, actionStrId } from "guifast_shared";

export interface IsInitializing extends Action { }

export const isInitializingStr = "is_initializing";
export const isInitializingId = actionStrId(String.module, isInitializingStr);

export const isInitializing = (): IsInitializing => {
    return {
        type: isInitializingId
    };
};
