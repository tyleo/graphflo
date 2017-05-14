import { String } from "graphflo";
import { Action, actionStrId, Vector2 } from "guifast_shared";

export interface SetNodeConnectorPosition extends Action {
    readonly index: number;
    readonly position: Vector2
}

export const setNodeConnectorPositionStr = "set_node_connector_position";
export const setNodeConnectorPositionId = actionStrId(String.module, setNodeConnectorPositionStr);

export const setNodeConnectorPosition = (
    index: number,
    position: Vector2
): SetNodeConnectorPosition => {
    return {
        type: setNodeConnectorPositionId,
        index: index,
        position: position
    };
};
