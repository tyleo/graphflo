import * as Guifast from "guifast_shared";

export interface MoveNodeState {
    readonly movingNode: number | undefined;
    readonly moveBeginLocation: Guifast.Vector2;
}
