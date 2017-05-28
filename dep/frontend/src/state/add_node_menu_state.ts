import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export interface AddNodeMenuState {
    readonly addNodeItems: Array<Graphflo.AddNodeItemState>;
    readonly sortedAddNodeItems: Array<number>;
    readonly filteredItems: Array<number>;
    readonly isVisible: boolean;
    readonly moduleId: number | undefined;
    readonly position: Guifast.Vector2;
    readonly searchString: string;
    readonly selectedFilteredItem: number;
    readonly size: Guifast.Vector2;
}
