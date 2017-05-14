import * as Guifast from "guifast_shared";
import * as GraphfloAction from "graphflo/action";
import { GraphfloState } from "graphflo/state";

export function reducer(
    state: GraphfloState,
    action: Guifast.Action = Guifast.UndefinedAction.make(),
    allState: Guifast.State
) {
    switch (action.type) {
        case GraphfloAction.NewEmptyWorkspace.id: {
            const newEmptyWorkspace = action as GraphfloAction.NewEmptyWorkspace.Action;

            Guifast.sendToGuifast(Guifast.WindowRequested.make("graphflo workspace_guifast_container"));
            break;
        }
    }
}
