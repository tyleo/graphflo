import { NodeStyle } from "graphflo/component/node";

export class NodeTitleTextCss {
    public readonly color: string;
    public readonly cursor: string = "default";
    public readonly fontFamily: string;
    public readonly fontSize: number;
    public readonly fontWeight: "normal" | "bold" | "lighter" | "bolder";
    public readonly paddingLeft: number;
    public readonly paddingRight: number;
    public readonly WebkitUserSelect: string = "none";
    public readonly whiteSpace: string = "nowrap";

    public constructor(style: NodeStyle) {
        this.color = style.titleFontColor!;
        this.fontFamily = style.titleFont!;
        this.fontSize = style.titleFontSize!;
        this.fontWeight = style.titleFontWeight!;
        this.paddingLeft = style.titlePaddingLeftRight!;
        this.paddingRight = style.titlePaddingLeftRight!;
    }
}
