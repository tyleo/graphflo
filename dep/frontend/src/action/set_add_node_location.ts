import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export namespace SetAddNodeLocation {
    const str = "set_add_node_location";
    export const id = Guifast.makeStrId(Graphflo.String.module, str);

    export interface Action extends Guifast.Action {
        readonly location: Guifast.Vector2
    }

    export const make = (location: Guifast.Vector2): Action => {
        return { type: id, location: location };
    };
}
