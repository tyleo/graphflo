import { Action, NumberMap, Vector2 } from "guifast_shared";
import { AddNodeResponse, addNodeResponseId } from "graphflo/action";
import { KeyedNodeDesc } from "graphflo/serialization";
import { nodeReducer } from "graphflo/reducer";
import { NodesState } from "graphflo/state";

import { UndefinedAction } from "guifast_shared/action/undefined_action";

const noop = (state: NodesState, action: Action, nextAddNodeLocation: Vector2, nodeDescs: Array<KeyedNodeDesc>): NodesState => {
    return {
        nodes: state.nodes.map(node => nodeReducer(node, action, nextAddNodeLocation, nodeDescs)),
        moduleId: state.moduleId
    };
};

export const nodesReducer = (
    state: NodesState = {
        nodes: [],
        moduleId: 0
    },
    action: Action = UndefinedAction.make(),
    nextAddNodeLocation: Vector2,
    nodeDescs: Array<KeyedNodeDesc>,
): NodesState => {
    switch (action.type) {
        case addNodeResponseId: {
            const addNodeResponse = action as AddNodeResponse;

            const newNodes = state.nodes.map(node => nodeReducer(node, action, nextAddNodeLocation, nodeDescs));
            newNodes[addNodeResponse.index] = nodeReducer(undefined, action, nextAddNodeLocation, nodeDescs);
            return {
                nodes: newNodes,
                moduleId: state.moduleId
            };
        }

        default: {
            return noop(state, action, nextAddNodeLocation, nodeDescs);
        }
    }
};
