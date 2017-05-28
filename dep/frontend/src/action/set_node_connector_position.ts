import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export namespace SetNodeConnectorPosition {
    const str = "set_node_connector_position";
    export const id = Guifast.makeStrId(Graphflo.String.module, str);

    export interface Action extends Guifast.Action {
        readonly index: number;
        readonly position: Guifast.Vector2
    }

    export const make = (index: number, position: Guifast.Vector2): Action => {
        return {
            type: id,
            index: index,
            position: position
        };
    };
}
