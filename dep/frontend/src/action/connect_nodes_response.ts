import { String } from "graphflo";
import { Action, actionStrId } from "guifast_shared";

export const connectNodesResponseStr = "connect_nodes_response";
export const connectNodesResponseId = actionStrId(String.module, connectNodesResponseStr);

export interface ConnectNodesResponse extends Action {
    readonly start_connector_index: number;
    readonly finish_connector_index: number;
}

export const connectNodesResponse = (
    startConnectorIndex: number,
    finishConnectorIndex: number
): ConnectNodesResponse => {
    return {
        type: connectNodesResponseId,
        start_connector_index: startConnectorIndex,
        finish_connector_index: finishConnectorIndex
    };
};
