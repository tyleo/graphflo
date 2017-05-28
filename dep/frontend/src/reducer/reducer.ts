import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

const noop = (state: Graphflo.GraphfloState, action: Guifast.Action): Graphflo.GraphfloState => {
    return {
        ...state,
        workspaceState: Graphflo.workspaceReducer(state.workspaceState!, action),
    };
};

export function reducer(
    state: Graphflo.GraphfloState = {
         workspaceState: Graphflo.workspaceReducer(undefined, undefined) 
    },
    action: Guifast.Action = Guifast.UndefinedAction.make(),
    rendererRootState: Guifast.RootRendererState
): Graphflo.GraphfloState {
    switch (action.type) {
        default: {
            return noop(state!, action);
        }
    }
};
