import { String } from "graphflo";
import { Action, actionStrId } from "guifast_shared";

export interface AddNode extends Action {
    readonly node_desc: number;
}

export const addNodeStr = "add_node";
export const addNodeId = actionStrId(String.module, addNodeStr);

export const addNode = (
    nodeDesc: number
): AddNode => {
    return {
        type: addNodeId,
        node_desc: nodeDesc,
    }
};
