import * as Graphflo from "graphflo";

export interface NodeProps {
    readonly nodeDescs: Array<Graphflo.KeyedNodeDesc>;
    readonly workspaceData: Graphflo.WorkspaceData;
    readonly workspaceProps: Graphflo.WorkspaceProps;

    readonly state: Graphflo.NodeState;
    readonly styleManager: Graphflo.StyleManager;
}
