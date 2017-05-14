import { String } from "graphflo";
import { Action, actionStrId, Vector2 } from "guifast_shared";

export interface FinishDraggingNode extends Action {
    readonly nodeIndex: number;
    readonly dragDistance: Vector2;
}

export const finishDraggingNodeStr = "finish_dragging_node";
export const finishDraggingNodeId = actionStrId(String.module, finishDraggingNodeStr);

export const finishDraggingNode = (
    nodeIndex: number,
    dragDistance: Vector2
): FinishDraggingNode => {
    return {
        type: finishDraggingNodeId,
        nodeIndex: nodeIndex,
        dragDistance: dragDistance
    };
};
