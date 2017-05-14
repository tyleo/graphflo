import { String } from "graphflo";
import { Action, actionStrId } from "guifast_shared";

export interface Get extends Action { }

export const getStr = "get";
export const getId = actionStrId(String.module, getStr);

export const get = (): Get => {
    return {
        type: getId
    };
};
