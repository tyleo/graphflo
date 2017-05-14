import { AddNodeItemState } from "graphflo/state";
import { KeyedNodeDesc } from "graphflo/serialization";
import { StyleManager } from "graphflo/util";

export interface AddNodeItemProps {
    readonly filteredItemIndex: number;
    readonly isSelected: boolean;
    readonly nodeDescs: Array<KeyedNodeDesc>;
    readonly styleManager: StyleManager;

    readonly state: AddNodeItemState;
}
