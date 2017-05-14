import { Action, NumberMap } from "guifast_shared";
import { AddNodeResponse, addNodeResponseId } from "graphflo/action";
import { nodeConnectorReducer } from "graphflo/reducer"
import { KeyedNodeDesc } from "graphflo/serialization";
import { NodeConnectorState, NodeConnectorsState, NodeConnectorType } from "graphflo/state";

import { UndefinedAction } from "guifast_shared/action/undefined_action";

const newNodeConnectors = (node: number, inputConnectors: Array<number>, outputConnectors: Array<number>, nodeDesc: KeyedNodeDesc): Array<NodeConnectorState> => {
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
                type: NodeConnectorType.End
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
                type: NodeConnectorType.Start
            });
        }
    }

    return result;
};

const noop = (state: NodeConnectorsState, action: Action, moduleId: number): NodeConnectorsState => {
    return {
        ...state,
        nodeConnectors: state.nodeConnectors.map(o => nodeConnectorReducer(o, action, moduleId))
    };
};

export const nodeConnectorsReducer = (
    state: NodeConnectorsState = {
        nodeConnectors: []
    },
    action: Action = UndefinedAction.make(),
    moduleId: number,
    nodeDescs: Array<KeyedNodeDesc>,
): NodeConnectorsState => {
    switch (action.type) {
        case addNodeResponseId: {
            const addNodeResponse = action as AddNodeResponse;
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
