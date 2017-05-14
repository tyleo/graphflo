import { Vector2 } from "guifast_shared";

export interface MoveNodeState {
    readonly movingNode: number | undefined;
    readonly moveBeginLocation: Vector2;
}
