import { NodeState } from "graphflo/state";

export interface NodesState {
    readonly nodes: Array<NodeState>;
    readonly moduleId: number;
}
