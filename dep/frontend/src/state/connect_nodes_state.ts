import { NodeConnectorType } from "graphflo/state";

export interface ConnectNodeState {
    readonly connectorIndex: number;
    readonly connectorType: NodeConnectorType;
}
