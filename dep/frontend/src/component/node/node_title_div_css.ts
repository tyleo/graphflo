import { NodeStyle } from "graphflo/component/node";

export class NodeTitleDivCss {
    public readonly alignItems = "center";
    public readonly backgroundColor: string;
    public readonly border: string;
    public readonly borderTopLeftRadius: number;
    public readonly borderTopRightRadius: number;
    public readonly display: string = "flex";
    public readonly justifyContent: "center" = "center";
    public readonly height: number;
    public readonly width: string = "100%";

    public constructor(
        style: NodeStyle,
        backgroundColor: string
    ) {
        const borderRadius = style.borderRadius! - style.deselectedBorderThickness!;

        this.backgroundColor = backgroundColor;
        this.borderTopLeftRadius = borderRadius;
        this.borderTopRightRadius = borderRadius;
        this.height = style.titleHeight!;
    }
}
