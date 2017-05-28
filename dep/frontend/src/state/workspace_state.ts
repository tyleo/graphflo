import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export interface WorkspaceState {
    readonly addNodeMenuState: Graphflo.AddNodeMenuState;
    readonly connectNodeState: Graphflo.ConnectNodeState | undefined;
    readonly moduleId: number | undefined;
    readonly moveNodeState: Graphflo.MoveNodeState;
    readonly nextAddNodeLocation: Guifast.Vector2;
    readonly nodeDescs: Array<Graphflo.KeyedNodeDesc>;
    readonly nodeConnectorsState: Graphflo.NodeConnectorsState | undefined;
    readonly nodesState: Graphflo.NodesState;
    readonly styleManager: Graphflo.StyleManager;
}
