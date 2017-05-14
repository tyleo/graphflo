import { WorkspaceData, WorkspaceProps } from "graphflo/component";
import { NodeDesc } from "graphflo/serialization";

export interface NodeConnectorProps {
    readonly index: number;
    readonly nodeDesc: NodeDesc;
    readonly workspaceData: WorkspaceData;
    readonly workspaceProps: WorkspaceProps;
}
