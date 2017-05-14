import { NodeDesc } from "graphflo/serialization";

export interface KeyedNodeDesc {
    readonly key: number;
    readonly node_desc: NodeDesc;
}
