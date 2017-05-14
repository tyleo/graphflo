import { AddNodeItemStyle } from "graphflo/component";

export class AddNodeItemTextCss {
    public readonly color: string;
    public readonly cursor: string = "pointer";
    public readonly fontFamily: string;
    public readonly fontSize: number;
    public readonly margin: string;
    public readonly WebkitUserSelect: string = "none";

    public constructor(style: AddNodeItemStyle) {
        this.color = style.foregroundColor!;
        this.fontFamily = style.font!;
        this.fontSize = style.fontSize!;
        this.margin = style.topBottomMargin! + "px" + " " + style.leftRightMargin! + "px";
    }
}
