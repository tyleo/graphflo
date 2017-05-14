import { String } from "graphflo";
import { NodeConnectorType } from "graphflo/state";
import { Action, actionStrId } from "guifast_shared";

export interface StartDraggingEdge extends Action {
    connectorIndex: number;
    connectorType: NodeConnectorType;
}

export const startDraggingEdgeStr = "start_dragging_edge";
export const startDraggingEdgeId = actionStrId(String.module, startDraggingEdgeStr);

export const startDraggingEdge = (
    connectorIndex: number,
    connectorType: NodeConnectorType
): StartDraggingEdge => {
    return {
        type: startDraggingEdgeId,
        connectorIndex: connectorIndex,
        connectorType: connectorType
    };
};
