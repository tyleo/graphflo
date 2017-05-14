import { WorkspaceData, WorkspaceProps } from "graphflo/component";
import { NodeConnectorState } from "graphflo/state";

export interface EdgeProps {
    readonly outputConnector: NodeConnectorState;
    readonly workspaceData: WorkspaceData;
    readonly workspaceProps: WorkspaceProps;
}
