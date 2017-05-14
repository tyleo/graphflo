import { String } from "graphflo";
import { Action, actionStrId } from "guifast_shared";

export interface SelectNode extends Action {
    readonly nodeIndex: number | undefined;
}

export const selectNodeStr = "select_node";
export const selectNodeId = actionStrId(String.module, selectNodeStr);

export const selectNode = (nodeIndex: number | undefined): SelectNode => {
    return {
        type: selectNodeId,
        nodeIndex: nodeIndex
    };
};
