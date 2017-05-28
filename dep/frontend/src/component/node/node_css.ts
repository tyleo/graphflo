import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export class NodeCss {
    public readonly alignItems = "center";
    public readonly backgroundColor: string;
    public readonly border: string;
    public readonly borderRadius: number;
    public readonly clear: string = "left";
    public readonly display: string = "flex";
    public readonly flexDirection = "column";
    public readonly float: string = "left";
    public readonly height: string = "auto";
    public readonly left: number;
    public readonly minHeight: number;
    public readonly minWidth: number;
    public readonly position = "absolute";
    public readonly top: number;


    public constructor(
        style: Graphflo.NodeStyle,
        isSelected: boolean,
        extents: Guifast.Vector2,
        position: Guifast.Vector2
    ) {
        this.backgroundColor = style.backgroundColor!;
        this.border = (
            isSelected ?
            style.selectedBorderThickness! + "px" + " " + "solid" + " " + style.selectedBorderColor! :
            style.deselectedBorderThickness! + "px" + " " + "solid" + " " + style.deselectedBorderColor!
        );
        this.borderRadius = style.borderRadius!;
        this.left = position.x;
        this.minHeight = extents.y;
        this.minWidth = extents.x;
        this.top = position.y;
    }
}
