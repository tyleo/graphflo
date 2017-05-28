import * as Graphflo from "graphflo";

export interface NodesProps {
    readonly nodeDescs: Array<Graphflo.KeyedNodeDesc>;
    readonly workspaceData: Graphflo.WorkspaceData;
    readonly workspaceProps: Graphflo.WorkspaceProps;

    readonly state: Graphflo.NodesState;
    readonly styleManager: Graphflo.StyleManager;
}
