import * as Guifast from "guifast_shared";
import * as Graphflo from "graphflo/state";

const noop = (state: Graphflo.AddNodeItemState, action: Guifast.Action): Graphflo.AddNodeItemState => {
    return {
        key: state.key,
        moduleId: state.moduleId
    };
};

export const addNodeItemReducer = (
    state: Graphflo.AddNodeItemState = {
        key: -1,
        moduleId: undefined,
    },
    action: Guifast.Action = Guifast.UndefinedAction.make()
): Graphflo.AddNodeItemState => {
    return noop(state, action);
};
