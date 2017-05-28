import * as graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export namespace FinishDraggingNode {
    const str = "finish_dragging_node";
    export const id = Guifast.makeStrId(Guifast.String.module, str);

    export interface Action extends Guifast.Action {
        readonly nodeIndex: number;
        readonly dragDistance: Guifast.Vector2;
    }

    export const make = (nodeIndex: number, dragDistance: Guifast.Vector2): Action => {
        return {
            type: id,
            nodeIndex: nodeIndex,
            dragDistance: dragDistance
        };
    };
}
