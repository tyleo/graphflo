import { Action, NumberMap, Vector2 } from "guifast_shared";
import { AddNodeResponse, addNodeResponseId, FinishDraggingNode, finishDraggingNodeId, SelectNode, selectNodeId } from "graphflo/action";
import { nodeConnectorReducer } from "graphflo/reducer";
import { NodeConnectorDescs, KeyedNodeDesc } from "graphflo/serialization";
import { NodeConnectorState, NodeConnectorType, NodeState } from "graphflo/state";

import { UndefinedAction } from "guifast_shared/action/undefined_action";

const noop = (state: NodeState, action: Action) => {
    return {
        extents: state.extents,
        index: state.index,
        isSelected: state.isSelected,
        inputConnectors: state.inputConnectors,
        nodeDescIndex: state.nodeDescIndex,
        moduleId: state.moduleId,
        position: state.position,
        outputConnectors: state.outputConnectors,
    };
};

export const nodeReducer = (
    state: NodeState = {
        extents: new Vector2(300, 200),
        index: -1,
        isSelected: false,
        inputConnectors: [],
        nodeDescIndex: 0,
        moduleId: 0,
        position: Vector2.zero,
        outputConnectors: []
    },
    action: Action = UndefinedAction.make(),
    nextAddNodeLocation: Vector2,
    nodeDescs: Array<KeyedNodeDesc>,
): NodeState => {
    switch (action.type) {
        case addNodeResponseId: {
            if (state.index !== -1) {
                return noop(state, action);
            }

            const addNodeResponse = action as AddNodeResponse;

            return {
                ...state,
                index: addNodeResponse.index,
                isSelected: true,
                inputConnectors: [...addNodeResponse.input_connectors],
                nodeDescId: addNodeResponse.node_desc,
                position: nextAddNodeLocation,
                outputConnectors: [...addNodeResponse.output_connectors]
            };
        }

        case finishDraggingNodeId: {
            const finishDraggingNode = action as FinishDraggingNode;
            if (finishDraggingNode.nodeIndex === state.index) {
                return {
                    ...state,
                    position: state.position.add(finishDraggingNode.dragDistance),
                };
            }
        }

        case selectNodeId: {
            const selectNode = action as SelectNode;
            if (selectNode.nodeIndex === state.index) {
                return {
                    ...state,
                    isSelected: true,
                };
            } else {
                return {
                    ...state,
                    isSelected: false,
                };
            }
        }

        default: {
            return noop(state, action);
        }
    }
};
