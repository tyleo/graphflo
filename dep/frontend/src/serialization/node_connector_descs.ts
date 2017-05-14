import { NodeConnectorDesc } from "graphflo/serialization";

export interface NodeConnectorDescs {
    readonly none?: any;
    readonly constant?: Array<NodeConnectorDesc>;
    readonly variable?: NodeConnectorDesc;
}
