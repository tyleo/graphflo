import { Action, InitializeModule, NumberMap, State, UndefinedAction } from "guifast_shared";
import { String } from "graphflo";
import { GetResponse, getResponseId, IsInitializing, isInitializingId } from "graphflo/action";
import { workspaceReducer } from "graphflo/reducer";
import { GraphfloState } from "graphflo/state";

const noop = (state: GraphfloState, action: Action): GraphfloState => {
    return {
        ...state,
        reducer: state.reducer,
        workspaceState: workspaceReducer(state.workspaceState!, action),
    };
};

export function reducer(
    state: GraphfloState | undefined,
    action: Action = UndefinedAction.make(),
    guifastState: State
): GraphfloState {
    switch (action.type) {
        case InitializeModule.id: {
            const initializeModule = action as InitializeModule.Action;
            return {
                reducer: initializeModule.reducer,
                workspaceState: workspaceReducer(undefined, undefined),
            };
        }

        default: {
            return noop(state!, action);
        }
    }
};
