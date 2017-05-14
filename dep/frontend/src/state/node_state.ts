import { Vector2 } from "guifast_shared";

export interface NodeState {
    readonly extents: Vector2;
    readonly index: number;
    readonly isSelected: boolean;
    readonly inputConnectors: Array<number>;
    readonly moduleId: number;
    readonly nodeDescIndex: number;
    readonly outputConnectors: Array<number>;
    readonly position: Vector2;
}
