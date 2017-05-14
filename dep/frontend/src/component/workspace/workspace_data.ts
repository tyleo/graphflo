import { Vector2 } from "guifast_shared";

export class WorkspaceData {
    public position = Vector2.zero;
    public scrollPosition = Vector2.zero;
    public readonly nodeConnectorPositions = new Array<Vector2>();
}
