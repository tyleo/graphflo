import { String } from "graphflo";
import { Action, actionStrId } from "guifast_shared";

export interface ChangeAddNodeMenuVisibility extends Action {
    readonly isVisible: boolean;
}

export const changeAddNodeMenuVisibilityStr = "change_add_node_menu_visibility";
export const changeAddNodeMenuVisibilityId = actionStrId(String.module, changeAddNodeMenuVisibilityStr);

export const changeAddNodeMenuVisibility = (
    isVisible: boolean
): ChangeAddNodeMenuVisibility => {
    return {
        type: changeAddNodeMenuVisibilityId,
        isVisible: isVisible
    };
};
