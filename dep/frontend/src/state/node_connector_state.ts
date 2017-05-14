import { Vector2 } from "guifast_shared";
import { NodeConnectorType } from "graphflo/state";

export interface NodeConnectorState {
    readonly backgroundColor: string;
    readonly connectedTo: number | undefined;
    readonly index: number;
    readonly indexInNode: number;
    readonly nodeIndex: number;
    readonly position: Vector2 | undefined;
    readonly type: NodeConnectorType;
}
