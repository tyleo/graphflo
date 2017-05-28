import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

const noop = (state: Graphflo.NodesState, action: Guifast.Action, nextAddNodeLocation: Guifast.Vector2, nodeDescs: Array<Graphflo.KeyedNodeDesc>): Graphflo.NodesState => {
    return {
        nodes: state.nodes.map(node => Graphflo.nodeReducer(node, action, nextAddNodeLocation, nodeDescs)),
        moduleId: state.moduleId
    };
};

export const nodesReducer = (
    state: Graphflo.NodesState = {
        nodes: [],
        moduleId: 0
    },
    action: Guifast.Action = Guifast.UndefinedAction.make(),
    nextAddNodeLocation: Guifast.Vector2,
    nodeDescs: Array<Graphflo.KeyedNodeDesc>,
): Graphflo.NodesState => {
    switch (action.type) {
        case Graphflo.AddNodeResponse.id: {
            const addNodeResponse = action as Graphflo.AddNodeResponse.Action;

            const newNodes = state.nodes.map(node => Graphflo.nodeReducer(node, action, nextAddNodeLocation, nodeDescs));
            newNodes[addNodeResponse.index] = Graphflo.nodeReducer(undefined, action, nextAddNodeLocation, nodeDescs);
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
