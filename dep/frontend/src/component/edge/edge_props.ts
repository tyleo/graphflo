import * as Graphflo from "graphflo";

export interface EdgeProps {
    readonly outputConnector: Graphflo.NodeConnectorState;
    readonly workspaceData: Graphflo.WorkspaceData;
    readonly workspaceProps: Graphflo.WorkspaceProps;
}
