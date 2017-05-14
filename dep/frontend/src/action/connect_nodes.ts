import { String } from "graphflo";
import { Action, actionStrId } from "guifast_shared";

export const connectNodesStr = "connect_nodes";
export const connectNodesId = actionStrId(String.module, connectNodesStr);

export interface ConnectNodes extends Action {
    readonly start_connector_index: number;
    readonly finish_connector_index: number;
}

export const connectNodes = (
    startConnectorIndex: number,
    finishConnectorIndex: number
): ConnectNodes => {
    return {
        type: connectNodesId,
        start_connector_index: startConnectorIndex,
        finish_connector_index: finishConnectorIndex
    };
};
