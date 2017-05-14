import { String } from "graphflo";
import { Action, actionStrId } from "guifast_shared";

export interface StopDraggingEdge extends Action { }

export const stopDraggingEdgeStr = "stop_dragging_edge";
export const stopDraggingEdgeId = actionStrId(String.module, stopDraggingEdgeStr);

export const stopDraggingEdge = (): StopDraggingEdge => {
    return {
        type: stopDraggingEdgeId
    };
};
