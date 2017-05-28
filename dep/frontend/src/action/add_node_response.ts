import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export namespace AddNodeResponse {
    const str = "add_node_response";
    export const id = Guifast.makeStrId(Graphflo.String.module, str);

    export interface Action extends Guifast.Action {
        readonly index: number;
        readonly node_desc: number;
        readonly input_connectors: Array<number>;
        readonly output_connectors: Array<number>;
    }

    export const make = (
        index: number,
        nodeDesc: number,
        inputConnectors: Array<number>,
        outputConnectors: Array<number>
    ): Action => {
        return {
            type: id,
            index: index,
            node_desc: nodeDesc,
            input_connectors: inputConnectors,
            output_connectors: outputConnectors
        };
    };
}
