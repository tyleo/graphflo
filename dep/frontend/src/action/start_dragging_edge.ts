import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export namespace StartDraggingEdge {
    const str = "start_dragging_edge";
    export const id = Guifast.makeStrId(Graphflo.String.module, str);

    export interface Action extends Guifast.Action {
        readonly connectorIndex: number;
        readonly connectorType: Graphflo.NodeConnectorType;
    }

    export const make = (connectorIndex: number, connectorType: Graphflo.NodeConnectorType): Action => {
        return {
            type: id,
            connectorIndex: connectorIndex,
            connectorType: connectorType
        };
    };
}
