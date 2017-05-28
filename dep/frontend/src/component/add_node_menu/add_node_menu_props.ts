import * as Graphflo from "graphflo";

export interface AddNodeMenuProps {
    readonly nodeDescs: Array<Graphflo.KeyedNodeDesc>;
    readonly styleManager: Graphflo.StyleManager;

    readonly state: Graphflo.AddNodeMenuState;
}
