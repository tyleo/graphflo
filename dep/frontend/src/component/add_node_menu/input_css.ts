import * as Graphflo from "graphflo";

export class InputCss {
    public readonly backgroundColor: string;
    public readonly border: string = "0px solid";
    public readonly boxSizing: string = "border-box";
    public readonly color: string;
    public readonly display: string = "block";
    public readonly fontFamily: string;
    public readonly fontSize: number;
    public readonly outline: string = "0 none";
    public readonly padding: string = "5px 5px";
    public readonly width: string = "100%";

    public constructor(style: Graphflo.AddNodeMenuStyle) {
        this.backgroundColor = style.backgroundColor!;
        this.color = style.foregroundColor!;
        this.fontFamily = style.font!;
        this.fontSize = style.fontSize!;
        this.padding = style.fontTopBottomPadding! + "px" + " " + style.fontLeftRightPadding! + "px";
    }
}
