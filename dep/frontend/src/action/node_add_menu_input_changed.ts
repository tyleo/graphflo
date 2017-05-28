import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export namespace NodeAddMenuInputChanged {
    const str = "node_add_menu_input_changed";
    export const id = Guifast.makeStrId(Graphflo.String.module, str);

    export interface Action extends Guifast.Action {
        readonly value: string;
    }

    export const make = (value: string): Action => {
        return { type: id, value: value };
    };
}
