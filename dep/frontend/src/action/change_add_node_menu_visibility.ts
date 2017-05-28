import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export namespace ChangeAddNodeMenuVisibility {
    const str = "change_add_node_menu_visibility";
    export const id = Guifast.makeStrId(Graphflo.String.module, str);

    export interface Action extends Guifast.Action {
        readonly isVisible: boolean;
    }

    export const make = (isVisible: boolean): Action => {
        return { type: id, isVisible: isVisible };
    };
}
