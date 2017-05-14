import { WorkspaceData, WorkspaceProps } from "graphflo/component";
import { NodeState } from "graphflo/state"
import { KeyedNodeDesc } from "graphflo/serialization";
import { StyleManager } from "graphflo/util";

export interface NodeProps {
    readonly nodeDescs: Array<KeyedNodeDesc>;
    readonly workspaceData: WorkspaceData;
    readonly workspaceProps: WorkspaceProps;

    readonly state: NodeState;
    readonly styleManager: StyleManager;
}
