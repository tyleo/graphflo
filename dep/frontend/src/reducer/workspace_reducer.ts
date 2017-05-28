import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

const noop = (state: Graphflo.WorkspaceState, action: Guifast.Action): Graphflo.WorkspaceState => {
    return {
        ...state,
        addNodeMenuState: Graphflo.addNodeMenuReducer(state.addNodeMenuState, action, state.nodeDescs),
        nodeConnectorsState: Graphflo.nodeConnectorsReducer(state.nodeConnectorsState, action, state.moduleId!, state.nodeDescs),
        nodesState: Graphflo.nodesReducer(state.nodesState, action, state.nextAddNodeLocation, state.nodeDescs),
    };
};

export const workspaceReducer = (
    state: Graphflo.WorkspaceState = {
        addNodeMenuState: Graphflo.addNodeMenuReducer(undefined, undefined, []),
        connectNodeState: undefined,
        moduleId: undefined,
        moveNodeState: {
            movingNode: undefined,
            moveBeginLocation: Guifast.Vector2.zero
        },
        nextAddNodeLocation: Guifast.Vector2.zero,
        nodeConnectorsState: undefined,
        nodeDescs: [],
        nodesState: Graphflo.nodesReducer(undefined, undefined, Guifast.Vector2.zero, []),
        styleManager: new Graphflo.StyleManager(),
    },
    action: Guifast.Action = Guifast.UndefinedAction.make()
): Graphflo.WorkspaceState => {
    switch (action.type) {
        case Graphflo.GetResponse.id: {
            const getResponse = action as Graphflo.GetResponse.Action;
            const nodeDescs = getResponse.node_descs.sort(
                (lhs, rhs) => lhs.key - rhs.key
            );

            return {
                ...state,
                addNodeMenuState: Graphflo.addNodeMenuReducer(state.addNodeMenuState, action, nodeDescs),
                nodeDescs: nodeDescs,
                nodeConnectorsState: Graphflo.nodeConnectorsReducer(state.nodeConnectorsState, action, state.moduleId!, nodeDescs),
                nodesState: Graphflo.nodesReducer(state.nodesState, action, state.nextAddNodeLocation, nodeDescs),
            };
        }

        case Graphflo.StartDraggingEdge.id: {
            const startDraggingEdge = action as Graphflo.StartDraggingEdge.Action;
            return {
                ...state,
                connectNodeState: {
                    connectorIndex: startDraggingEdge.connectorIndex,
                    connectorType: startDraggingEdge.connectorType
                }
            };
        }

        case Graphflo.SetAddNodeLocation.id: {
            const setAddNodeLocation = action as Graphflo.SetAddNodeLocation.Action;
            return {
                ...state,
                addNodeMenuState: Graphflo.addNodeMenuReducer(state.addNodeMenuState, action, state.nodeDescs),
                nodeConnectorsState: Graphflo.nodeConnectorsReducer(state.nodeConnectorsState, action, state.moduleId!, state.nodeDescs),
                nextAddNodeLocation: setAddNodeLocation.location,
                nodesState: Graphflo.nodesReducer(state.nodesState, action, state.nextAddNodeLocation, state.nodeDescs),
            };
        }

        case Graphflo.StartDraggingNode.id: {
            const startDraggingNode = action as Graphflo.StartDraggingNode.Action;
            return {
                ...state,
                addNodeMenuState: Graphflo.addNodeMenuReducer(state.addNodeMenuState, action, state.nodeDescs),
                moveNodeState: {
                    movingNode: startDraggingNode.nodeIndex,
                    moveBeginLocation: startDraggingNode.mouseDownLocation
                },
                nodeConnectorsState: Graphflo.nodeConnectorsReducer(state.nodeConnectorsState, action, state.moduleId!, state.nodeDescs),
                nodesState: Graphflo.nodesReducer(state.nodesState, action, state.nextAddNodeLocation, state.nodeDescs),
            };
        }

        case Graphflo.FinishDraggingNode.id: {
            const finishDraggingNode = action as Graphflo.FinishDraggingNode.Action;
            return {
                ...state,
                addNodeMenuState: Graphflo.addNodeMenuReducer(state.addNodeMenuState, action, state.nodeDescs),
                moveNodeState: {
                    movingNode: undefined,
                    moveBeginLocation: Guifast.Vector2.zero
                },
                nodeConnectorsState: Graphflo.nodeConnectorsReducer(state.nodeConnectorsState, action, state.moduleId!, state.nodeDescs),
                nodesState: Graphflo.nodesReducer(state.nodesState, action, state.nextAddNodeLocation, state.nodeDescs),
            };
        }

        default: {
            return noop(state, action);
        }
    }
};
