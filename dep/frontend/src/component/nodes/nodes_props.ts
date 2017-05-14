import { WorkspaceData, WorkspaceProps } from "graphflo/component";
import { KeyedNodeDesc } from "graphflo/serialization";
import { StyleManager } from "graphflo/util";
import { NodesState } from "graphflo/state";

export interface NodesProps {
    readonly nodeDescs: Array<KeyedNodeDesc>;
    readonly workspaceData: WorkspaceData;
    readonly workspaceProps: WorkspaceProps;

    readonly state: NodesState;
    readonly styleManager: StyleManager;
}
