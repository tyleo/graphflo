import { String } from "graphflo";
import { Action, actionStrId } from "guifast_shared";

export interface SelectAddNodeItem extends Action {
    readonly filteredItemIndex: number;
}

export const selectAddNodeItemStr = "select_add_node_item";
export const selectAddNodeItemId = actionStrId(String.module, selectAddNodeItemStr)

export const selectAddNodeItem = (filteredItemIndex: number): SelectAddNodeItem => {
    return {
        type: selectAddNodeItemId,
        filteredItemIndex: filteredItemIndex
    };
};
