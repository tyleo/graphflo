import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export namespace AddNode {
    const str = "add_node";
    export const id = Guifast.makeStrId(Graphflo.String.module, str);

    export interface Action extends Guifast.Action {
        readonly node_desc: number;
    }

    export const make = (nodeDesc: number): Action => {
        return { type: id, node_desc: nodeDesc };
    };
}
