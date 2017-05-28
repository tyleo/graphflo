import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export namespace SelectNode {
    const str = "select_node";
    export const id = Guifast.makeStrId(Graphflo.String.module, str);

    export interface Action extends Guifast.Action {
        readonly nodeIndex: number | undefined;
    }

    export const make = (nodeIndex: number | undefined): Action => {
        return { type: id, nodeIndex: nodeIndex };
    };
}
