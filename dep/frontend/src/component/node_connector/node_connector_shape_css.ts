import { NodeConnectorStyle } from "graphflo/component";

export class NodeConnectorShapeCss {
    public readonly alignSelf = "center";
    public readonly backgroundColor: string;
    public readonly border: string;
    public readonly borderRadius: string = "50%";
    public readonly height: number;
    public readonly width: number;

    public constructor(
        style: NodeConnectorStyle,
        backgroundColor: string,
        isFilled: boolean
    ) {
        if (isFilled) {
            this.backgroundColor = backgroundColor;
            this.border = "0" + "px" + " " + "solid" + " " + "transparent";
            this.height = style.shapeSize!;
            this.width = style.shapeSize!;
        } else {
            this.backgroundColor = "transparent";
            this.border = style.shapeOutlineThickness! + "px" + " " + "solid" + " " + backgroundColor;
            const adjustedSize = style.shapeSize! - style.shapeOutlineThickness! * 2;
            this.height = adjustedSize;
            this.width = adjustedSize;
        }
    }
}
