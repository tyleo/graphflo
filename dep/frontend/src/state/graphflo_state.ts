import { RendererState } from "guifast_shared";
import { WorkspaceState } from "graphflo/state";

export interface GraphfloState extends RendererState {
    readonly workspaceState: WorkspaceState;
}
