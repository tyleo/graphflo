import * as Graphflo from "graphflo";

export interface NodesState {
    readonly nodes: Array<Graphflo.NodeState>;
    readonly moduleId: number;
}
