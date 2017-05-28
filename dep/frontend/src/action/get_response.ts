import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export namespace GetResponse {
    const str = "get_response";
    export const id = Guifast.makeStrId(Graphflo.String.module, str);

    export interface Action extends Guifast.Action {
        readonly node_descs: Array<Graphflo.KeyedNodeDesc>
    }

    export const make = (nodeDescs: Array<Graphflo.KeyedNodeDesc>): Action => {
        return { type: id, node_descs: nodeDescs };
    };
}
