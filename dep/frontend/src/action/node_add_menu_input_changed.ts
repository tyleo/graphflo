import { String } from "graphflo";
import { Action, actionStrId } from "guifast_shared";

export interface NodeAddMenuInputChanged extends Action {
    readonly value: string;
}

export const nodeAddMenuInputChangedStr = "node_add_menu_input_changed";
export const nodeAddMenuInputChangedId = actionStrId(String.module, nodeAddMenuInputChangedStr);

export const nodeAddMenuInputChanged = (value: string): NodeAddMenuInputChanged => {
    return {
        type: nodeAddMenuInputChangedId,
        value: value
    };
};
