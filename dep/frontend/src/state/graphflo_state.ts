import { ModuleState } from "guifast_shared";
import { WorkspaceState } from "graphflo/state";

export interface GraphfloState extends ModuleState {
    readonly workspaceState: WorkspaceState;
}
