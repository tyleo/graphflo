import { String } from "graphflo";
import { Action, actionStrId, Vector2 } from "guifast_shared";

export interface SetAddNodeLocation extends Action {
    readonly location: Vector2
}

export const setAddNodeLocationStr = "set_add_node_location";
export const setAddNodeLocationId = actionStrId(String.module, setAddNodeLocationStr);

export const setAddNodeLocation = (location: Vector2): SetAddNodeLocation => {
    return {
        type: setAddNodeLocationId,
        location: location
    };
};
