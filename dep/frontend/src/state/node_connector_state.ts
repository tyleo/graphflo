import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export interface NodeConnectorState {
    readonly backgroundColor: string;
    readonly connectedTo: number | undefined;
    readonly index: number;
    readonly indexInNode: number;
    readonly nodeIndex: number;
    readonly position: Guifast.Vector2 | undefined;
    readonly type: Graphflo.NodeConnectorType;
}
