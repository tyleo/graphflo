import * as Graphflo from "graphflo";

export interface NodeConnectorDescs {
    readonly none?: any;
    readonly constant?: Array<Graphflo.NodeConnectorDesc>;
    readonly variable?: Graphflo.NodeConnectorDesc;
}
