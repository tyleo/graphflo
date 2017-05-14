import { NodeStyle } from "graphflo/component/node";

export class PaddingBetweenNodeConnectorsCss {
    public readonly height: number;

    public constructor(style: NodeStyle) {
        this.height = style.paddingBetweenNodeConnectors!;
    }
}
