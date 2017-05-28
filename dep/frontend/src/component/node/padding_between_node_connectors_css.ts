import * as Graphflo from "graphflo";

export class PaddingBetweenNodeConnectorsCss {
    public readonly height: number;

    public constructor(style: Graphflo.NodeStyle) {
        this.height = style.paddingBetweenNodeConnectors!;
    }
}
