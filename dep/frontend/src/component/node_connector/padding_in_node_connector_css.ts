import * as Graphflo from "graphflo";

export class PaddingInNodeConnectorCss {
    public readonly width: number;

    public constructor(style: Graphflo.NodeConnectorStyle) {
        this.width = style.internalPadding!;
    }
}
