import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

const noop = (state: Graphflo.NodeState, action: Guifast.Action) => {
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
    state: Graphflo.NodeState = {
        extents: new Guifast.Vector2(300, 200),
        index: -1,
        isSelected: false,
        inputConnectors: [],
        nodeDescIndex: 0,
        moduleId: 0,
        position: Guifast.Vector2.zero,
        outputConnectors: []
    },
    action: Guifast.Action = Guifast.UndefinedAction.make(),
    nextAddNodeLocation: Guifast.Vector2,
    nodeDescs: Array<Graphflo.KeyedNodeDesc>,
): Graphflo.NodeState => {
    switch (action.type) {
        case Graphflo.AddNodeResponse.id: {
            if (state.index !== -1) {
                return noop(state, action);
            }

            const addNodeResponse = action as Graphflo.AddNodeResponse.Action;

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

        case Graphflo.FinishDraggingNode.id: {
            const finishDraggingNode = action as Graphflo.FinishDraggingNode.Action;
            if (finishDraggingNode.nodeIndex === state.index) {
                return {
                    ...state,
                    position: state.position.add(finishDraggingNode.dragDistance),
                };
            }
        }

        case Graphflo.SelectNode.id: {
            const selectNode = action as Graphflo.SelectNode.Action;
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
