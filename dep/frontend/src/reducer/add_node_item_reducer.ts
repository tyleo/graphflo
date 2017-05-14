import { Action } from "guifast_shared";
import { AddNodeItemState } from "graphflo/state";

import { UndefinedAction } from "guifast_shared/action/undefined_action";

const noop = (state: AddNodeItemState, action: Action): AddNodeItemState => {
    return {
        key: state.key,
        moduleId: state.moduleId
    };
};

export const addNodeItemReducer = (
    state: AddNodeItemState = {
        key: -1,
        moduleId: undefined,
    },
    action: Action = UndefinedAction.make()
): AddNodeItemState => {
    return noop(state, action);
};
