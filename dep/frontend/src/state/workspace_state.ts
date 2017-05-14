import { Vector2 } from "guifast_shared";
import { KeyedNodeDesc } from "graphflo/serialization";
import { AddNodeMenuState, ConnectNodeState, MoveNodeState, NodeConnectorsState, NodesState } from "graphflo/state";
import { StyleManager } from "graphflo/util/style_manager";

export interface WorkspaceState {
    readonly addNodeMenuState: AddNodeMenuState;
    readonly connectNodeState: ConnectNodeState | undefined;
    readonly moduleId: number | undefined;
    readonly moveNodeState: MoveNodeState;
    readonly nextAddNodeLocation: Vector2;
    readonly nodeDescs: Array<KeyedNodeDesc>;
    readonly nodeConnectorsState: NodeConnectorsState | undefined;
    readonly nodesState: NodesState;
    readonly styleManager: StyleManager;
}
