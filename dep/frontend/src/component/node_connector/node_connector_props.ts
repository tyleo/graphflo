import * as Graphflo from "graphflo";

export interface NodeConnectorProps {
    readonly index: number;
    readonly nodeDesc: Graphflo.NodeDesc;
    readonly workspaceData: Graphflo.WorkspaceData;
    readonly workspaceProps: Graphflo.WorkspaceProps;
}
