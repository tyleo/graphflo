import { String } from "graphflo";
import { Action, actionStrId } from "guifast_shared";

export interface AddNodeResponse extends Action {
    readonly index: number;
    readonly node_desc: number;
    readonly input_connectors: Array<number>;
    readonly output_connectors: Array<number>;
}

export const addNodeResponseStr = "add_node_response";
export const addNodeResponseId = actionStrId(String.module, addNodeResponseStr);

export const addNodeResponse = (
    index: number,
    nodeDesc: number,
    inputConnectors: Array<number>,
    outputConnectors: Array<number>
): AddNodeResponse => {
    return {
        type: addNodeResponseId,
        index: index,
        node_desc: nodeDesc,
        input_connectors: inputConnectors,
        output_connectors: outputConnectors
    }
};
