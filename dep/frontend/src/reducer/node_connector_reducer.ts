import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export const nodeConnectorReducer = (
    state: Graphflo.NodeConnectorState,
    action: Guifast.Action = Guifast.UndefinedAction.make(),
    moduleId: number
): Graphflo.NodeConnectorState => {
    switch (action.type) {
        case Graphflo.ConnectNodesResponse.id: {
            const connectNodesResponse = action as Graphflo.ConnectNodesResponse.Action;
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

        case Graphflo.SetNodeConnectorPosition.id: {
            const setNodeConnectorPosition = action as Graphflo.SetNodeConnectorPosition.Action;
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
