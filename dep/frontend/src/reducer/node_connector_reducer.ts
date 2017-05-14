import { Action, NumberMap } from "guifast_shared";
import { ConnectNodesResponse, connectNodesResponseId, SetNodeConnectorPosition, setNodeConnectorPositionId } from "graphflo/action";
import { NodeConnectorState, NodeConnectorType } from "graphflo/state";

import { UndefinedAction } from "guifast_shared/action/undefined_action";

export const nodeConnectorReducer = (
    state: NodeConnectorState,
    action: Action = UndefinedAction.make(),
    moduleId: number
): NodeConnectorState => {
    switch (action.type) {
        case connectNodesResponseId: {
            const connectNodesResponse = action as ConnectNodesResponse;
            if (connectNodesResponse.start_connector_index === state.index) {
                return {
                    ...state,
                    connectedTo: connectNodesResponse.finish_connector_index
                };
            } else if (connectNodesResponse.finish_connector_index === state.index) {
                return {
                    ...state,
                    connectedTo: connectNodesResponse.start_connector_index
                };
            } else {
                return {
                    ...state
                };
            }
        }

        case setNodeConnectorPositionId: {
            const setNodeConnectorPosition = action as SetNodeConnectorPosition;
            if (state.index === setNodeConnectorPosition.index) {
                return {
                    ...state,
                    position: setNodeConnectorPosition.position
                };
            } else {
                return {
                    ...state
                };
            }
        }

        default: {
            return {
                ...state
            };
        }
    }
};
