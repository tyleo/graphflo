import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export function mainReducer(
    mainState: undefined,
    rendererState: Graphflo.GraphfloState,
    action: Guifast.Action = Guifast.UndefinedAction.make(),
    rootMainState: Guifast.RootMainState,
    rootRendererState: Guifast.RootRendererState
): any {
    switch (action.type) {
        case Graphflo.NewEmptyWorkspace.id: {
            const newEmptyWorkspace = action as Graphflo.NewEmptyWorkspace.Action;

            Guifast.sendToMain(Guifast.WindowRequested.make("graphflo workspace_container"));
            break;
        }
    }

    return undefined;
}
