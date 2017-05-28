import * as Graphflo from "graphflo";

export interface AddNodeItemProps {
    readonly filteredItemIndex: number;
    readonly isSelected: boolean;
    readonly nodeDescs: Array<Graphflo.KeyedNodeDesc>;
    readonly styleManager: Graphflo.StyleManager;

    readonly state: Graphflo.AddNodeItemState;
}
