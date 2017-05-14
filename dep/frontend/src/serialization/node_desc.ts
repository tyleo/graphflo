import { NodeConnectorDescs } from "graphflo/serialization";

export class NodeDesc {
    readonly title: string;
    readonly has_input: boolean;
    readonly has_output: boolean;
    readonly left_connectors: NodeConnectorDescs;
    readonly right_connectors: NodeConnectorDescs;
    readonly min_width?: number;
    readonly min_height?: number
}
