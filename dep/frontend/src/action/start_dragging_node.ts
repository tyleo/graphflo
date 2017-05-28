import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export namespace StartDraggingNode {
    const str = "start_dragging_node";
    export const id = Guifast.makeStrId(Graphflo.String.module, str);

    export interface Action extends Guifast.Action {
        readonly nodeIndex: number | undefined;
        readonly mouseDownLocation: Guifast.Vector2;
    }

    export const make = (nodeIndex: number | undefined, mouseDownLocation: Guifast.Vector2): Action => {
        return {
            type: id,
            nodeIndex: nodeIndex,
            mouseDownLocation: mouseDownLocation
        };
    };
}
