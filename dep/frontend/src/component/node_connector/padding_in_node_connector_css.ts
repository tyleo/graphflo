import { NodeConnectorStyle } from "graphflo/component";

export class PaddingInNodeConnectorCss {
    public readonly width: number;

    public constructor(style: NodeConnectorStyle) {
        this.width = style.internalPadding!;
    }
}
