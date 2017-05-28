import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

const newNodeConnectors = (node: number, inputConnectors: Array<number>, outputConnectors: Array<number>, nodeDesc: Graphflo.KeyedNodeDesc): Array<Graphflo.NodeConnectorState> => {
    const result = [];

    const inputConnectorDescs = nodeDesc.node_desc.left_connectors;
    if (inputConnectorDescs.constant !== undefined) {
        for (let i = 0; i < inputConnectors.length; i++) {
            const inputConnectorDesc = inputConnectorDescs.constant[i];
            const inputConnector = inputConnectors[i];
            result.push({
                backgroundColor: "#FFFFFF",
                connectedTo: undefined,
                index: inputConnector,
                indexInNode: i,
                nodeIndex: node,
                position: undefined,
                type: Graphflo.NodeConnectorType.End
            });
        }
    }

    const outputConnectorDescs = nodeDesc.node_desc.right_connectors;
    if (outputConnectorDescs.constant !== undefined) {
        for (let i = 0; i < outputConnectors.length; i++) {
            const outputConnectorDesc = outputConnectorDescs.constant[i];
            const outputConnector = outputConnectors[i];
            result.push({
                backgroundColor: "#FFFFFF",
                connectedTo: undefined,
                index: outputConnector,
                indexInNode: i,
                nodeIndex: node,
                position: undefined,
                type: Graphflo.NodeConnectorType.Start
            });
        }
    }

    return result;
};

const noop = (state: Graphflo.NodeConnectorsState, action: Guifast.Action, moduleId: number): Graphflo.NodeConnectorsState => {
    return {
        ...state,
        nodeConnectors: state.nodeConnectors.map(o => Graphflo.nodeConnectorReducer(o, action, moduleId))
    };
};

export const nodeConnectorsReducer = (
    state: Graphflo.NodeConnectorsState = {
        nodeConnectors: []
    },
    action: Guifast.Action = Guifast.UndefinedAction.make(),
    moduleId: number,
    nodeDescs: Array<Graphflo.KeyedNodeDesc>,
): Graphflo.NodeConnectorsState => {
    switch (action.type) {
        case Graphflo.AddNodeResponse.id: {
            const addNodeResponse = action as Graphflo.AddNodeResponse.Action;
            const nodeDesc = nodeDescs[addNodeResponse.node_desc];
            const newConnectors = newNodeConnectors(addNodeResponse.index, addNodeResponse.input_connectors, addNodeResponse.output_connectors, nodeDesc);
            const resultConnectors = [...state.nodeConnectors];
            for (const connector of newConnectors) {
                resultConnectors[connector.index] = connector;
            }
            return {
                ...state,
                nodeConnectors: resultConnectors,
            };
        }

        default: {
            return noop(state, action, moduleId);
        }
    }
};
