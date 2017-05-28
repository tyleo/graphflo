import * as Guifast from "guifast_shared";

export interface NodeState {
    readonly extents: Guifast.Vector2;
    readonly index: number;
    readonly isSelected: boolean;
    readonly inputConnectors: Array<number>;
    readonly moduleId: number;
    readonly nodeDescIndex: number;
    readonly outputConnectors: Array<number>;
    readonly position: Guifast.Vector2;
}
