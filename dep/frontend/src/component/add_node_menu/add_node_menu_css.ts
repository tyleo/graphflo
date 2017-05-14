import { Vector2 } from "guifast_shared";
import { AddNodeMenuStyle } from "graphflo/component/add_node_menu";
import { AddNodeMenuState } from "graphflo/state";

export class AddNodeMenuCss {
    public readonly backgroundColor: string;
    public readonly border: string;
    public readonly float: string = "left";
    public readonly height: number;
    public readonly left: number;
    public readonly position = "absolute";
    public readonly top: number;
    public readonly width: number;

    public constructor(
        style: AddNodeMenuStyle,
        state: AddNodeMenuState
    ) {
        const position = state.position;
        const size = state.size;

        this.backgroundColor = style.backgroundColor!;
        this.border = style.borderThickness! + "px" + " " + "solid" + " " + style.borderColor!;
        this.height = size.y;
        this.left = position.x;
        this.top = position.y;
        this.width = size.x;
    }
}
