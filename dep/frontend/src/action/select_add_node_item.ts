import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export namespace SelectAddNodeItem {
    const str = "select_add_node_item";
    export const id = Guifast.makeStrId(Graphflo.String.module, str)

    export interface Action extends Guifast.Action {
        readonly filteredItemIndex: number;
    }

    export const make = (filteredItemIndex: number): Action => {
        return { type: id, filteredItemIndex: filteredItemIndex };
    };
}
