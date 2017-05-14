import { Action, NumberMap, Vector2 } from "guifast_shared";
import { FinishDraggingNode, finishDraggingNodeId, GetResponse, getResponseId, SetAddNodeLocation, setAddNodeLocationId, StartDraggingEdge, startDraggingEdgeId, StartDraggingNode, startDraggingNodeId } from "graphflo/action";
import { addNodeMenuReducer, nodeConnectorsReducer, nodesReducer } from "graphflo/reducer";
import { KeyedNodeDesc } from "graphflo/serialization";
import { ConnectNodeState, NodeConnectorType, WorkspaceState } from "graphflo/state";
import { StyleManager } from "graphflo/util";

import { UndefinedAction } from "guifast_shared/action/undefined_action";

const noop = (state: WorkspaceState, action: Action): WorkspaceState => {
    return {
        ...state,
        addNodeMenuState: addNodeMenuReducer(state.addNodeMenuState, action, state.nodeDescs),
        nodeConnectorsState: nodeConnectorsReducer(state.nodeConnectorsState, action, state.moduleId!, state.nodeDescs),
        nodesState: nodesReducer(state.nodesState, action, state.nextAddNodeLocation, state.nodeDescs),
    };
};

export const workspaceReducer = (
    state: WorkspaceState = {
        addNodeMenuState: addNodeMenuReducer(undefined, undefined, []),
        connectNodeState: undefined,
        moduleId: undefined,
        moveNodeState: {
            movingNode: undefined,
            moveBeginLocation: Vector2.zero
        },
        nextAddNodeLocation: Vector2.zero,
        nodeConnectorsState: undefined,
        nodeDescs: [],
        nodesState: nodesReducer(undefined, undefined, Vector2.zero, []),
        styleManager: new StyleManager(),
    },
    action: Action = UndefinedAction.make()
): WorkspaceState => {
    switch (action.type) {
        case getResponseId: {
            const getResponse = action as GetResponse;
            const nodeDescs = getResponse.node_descs.sort(
                (lhs, rhs) => lhs.key - rhs.key
            );

            return {
                ...state,
                addNodeMenuState: addNodeMenuReducer(state.addNodeMenuState, action, nodeDescs),
                nodeDescs: nodeDescs,
                nodeConnectorsState: nodeConnectorsReducer(state.nodeConnectorsState, action, state.moduleId!, nodeDescs),
                nodesState: nodesReducer(state.nodesState, action, state.nextAddNodeLocation, nodeDescs),
            };
        }

        case startDraggingEdgeId: {
            const startDraggingEdge = action as StartDraggingEdge;
            return {
                ...state,
                connectNodeState: {
                    connectorIndex: startDraggingEdge.connectorIndex,
                    connectorType: startDraggingEdge.connectorType
                }
            };
        }

        case setAddNodeLocationId: {
            const setAddNodeLocation = action as SetAddNodeLocation;
            return {
                ...state,
                addNodeMenuState: addNodeMenuReducer(state.addNodeMenuState, action, state.nodeDescs),
                nodeConnectorsState: nodeConnectorsReducer(state.nodeConnectorsState, action, state.moduleId!, state.nodeDescs),
                nextAddNodeLocation: setAddNodeLocation.location,
                nodesState: nodesReducer(state.nodesState, action, state.nextAddNodeLocation, state.nodeDescs),
            };
        }

        case startDraggingNodeId: {
            const startDraggingNode = action as StartDraggingNode;
            return {
                ...state,
                addNodeMenuState: addNodeMenuReducer(state.addNodeMenuState, action, state.nodeDescs),
                moveNodeState: {
                    movingNode: startDraggingNode.nodeIndex,
                    moveBeginLocation: startDraggingNode.mouseDownLocation
                },
                nodeConnectorsState: nodeConnectorsReducer(state.nodeConnectorsState, action, state.moduleId!, state.nodeDescs),
                nodesState: nodesReducer(state.nodesState, action, state.nextAddNodeLocation, state.nodeDescs),
            };
        }

        case finishDraggingNodeId: {
            const finishDraggingNode = action as FinishDraggingNode;
            return {
                ...state,
                addNodeMenuState: addNodeMenuReducer(state.addNodeMenuState, action, state.nodeDescs),
                moveNodeState: {
                    movingNode: undefined,
                    moveBeginLocation: Vector2.zero
                },
                nodeConnectorsState: nodeConnectorsReducer(state.nodeConnectorsState, action, state.moduleId!, state.nodeDescs),
                nodesState: nodesReducer(state.nodesState, action, state.nextAddNodeLocation, state.nodeDescs),
            };
        }

        default: {
            return noop(state, action);
        }
    }
};
