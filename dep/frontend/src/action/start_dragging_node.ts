import { String } from "graphflo";
import { Action, actionStrId, Vector2 } from "guifast_shared";

export interface StartDraggingNode extends Action {
    readonly nodeIndex: number | undefined;
    readonly mouseDownLocation: Vector2;
}

export const startDraggingNodeStr = "start_dragging_node";
export const startDraggingNodeId = actionStrId(String.module, startDraggingNodeStr);

export const startDraggingNode = (
    nodeIndex: number | undefined,
    mouseDownLocation: Vector2
): StartDraggingNode => {
    return {
        type: startDraggingNodeId,
        nodeIndex: nodeIndex,
        mouseDownLocation: mouseDownLocation
    };
};
