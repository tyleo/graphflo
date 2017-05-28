import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export namespace NewEmptyWorkspace {
    const str = "new_empty_workspace";
    export const id = Guifast.makeStrId(Graphflo.String.module, str);

    export interface Action extends Guifast.Action { }

    export const make = (): Action => { return { type: id }; };
}
