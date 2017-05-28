import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export namespace ConnectNodesResponse {
    const str = "connect_nodes_response";
    export const id = Guifast.makeStrId(Graphflo.String.module, str);

    export interface Action extends Guifast.Action {
        readonly start_connector_index: number;
        readonly finish_connector_index: number;
    }

    export const make = (
        startConnectorIndex: number,
        finishConnectorIndex: number
    ): Action => {
        return {
            type: id,
            start_connector_index: startConnectorIndex,
            finish_connector_index: finishConnectorIndex
        };
    };
}

