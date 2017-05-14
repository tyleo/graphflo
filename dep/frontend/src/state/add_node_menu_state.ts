import { AddNodeItemState } from "graphflo/state";
import { Vector2 } from "guifast_shared";

export interface AddNodeMenuState {
    readonly addNodeItems: Array<AddNodeItemState>;
    readonly sortedAddNodeItems: Array<number>;
    readonly filteredItems: Array<number>;
    readonly isVisible: boolean;
    readonly moduleId: number | undefined;
    readonly position: Vector2;
    readonly searchString: string;
    readonly selectedFilteredItem: number;
    readonly size: Vector2;
}
