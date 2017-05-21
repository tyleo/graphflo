import * as Guifast from "guifast_shared";
import * as GraphfloAction from "graphflo/action";
import { GraphfloState } from "graphflo/state";

export function reducer(
    mainState: undefined,
    rendererState: GraphfloState,
    action: Guifast.Action = Guifast.UndefinedAction.make(),
    rootMainState: Guifast.RootMainState,
    rootRendererState: Guifast.RootRendererState
): any {
    switch (action.type) {
        case GraphfloAction.NewEmptyWorkspace.id: {
            const newEmptyWorkspace = action as GraphfloAction.NewEmptyWorkspace.Action;

            Guifast.sendToMain(Guifast.WindowRequested.make("graphflo workspace_guifast_container"));
            break;
        }
    }

    return undefined;
}
