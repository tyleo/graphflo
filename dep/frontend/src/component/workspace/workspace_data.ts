import * as Guifast from "guifast_shared";

export class WorkspaceData {
    public position = Guifast.Vector2.zero;
    public scrollPosition = Guifast.Vector2.zero;
    public readonly nodeConnectorPositions = new Array<Guifast.Vector2>();
}
