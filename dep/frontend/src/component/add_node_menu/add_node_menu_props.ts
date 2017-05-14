import { AddNodeMenuState } from "graphflo/state";
import { KeyedNodeDesc } from "graphflo/serialization";
import { StyleManager } from "graphflo/util";

export interface AddNodeMenuProps {
    readonly nodeDescs: Array<KeyedNodeDesc>;
    readonly styleManager: StyleManager;

    readonly state: AddNodeMenuState;
}
