import * as Graphflo from "graphflo";

export class NodeConnectorTextCss {
    public readonly alignSelf = "center";
    public readonly color: string;
    public readonly cursor: string = "default";
    public readonly fontFamily: string;
    public readonly fontSize: number;
    public readonly fontWeight: "normal" | "bold" | "lighter" | "bolder";
    public readonly verticalAlign: string = "middle";
    public readonly WebkitUserSelect: string = "none";
    public readonly whiteSpace: string = "nowrap";

    public constructor(style: Graphflo.NodeConnectorStyle) {
        this.color = style.textFontColor!;
        this.fontFamily = style.textFont!;
        this.fontSize = style.textFontSize!;
        this.fontWeight = style.textFontWeight!;
    }
}
