import * as Graphflo from "graphflo";

export interface ConnectNodeState {
    readonly connectorIndex: number;
    readonly connectorType: Graphflo.NodeConnectorType;
}
