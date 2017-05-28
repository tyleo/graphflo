import * as Graphflo from "graphflo";

export class LeftRightNodeConnectorHolderCss {
    public readonly alignItems: "flex-start" | "flex-end";
    public readonly display: string = "flex";
    public readonly flexDirection = "column";
    public readonly paddingBottom: number;
    public readonly paddingLeft: number;
    public readonly paddingRight: number;
    public readonly paddingTop: number;

    public constructor(
        style: Graphflo.NodeStyle,
        isLeft: boolean
    ) {
        this.alignItems =
            isLeft ?
                "flex-start" :
                "flex-end";
        this.paddingBottom = style.connectorHolderPaddingBottom!;
        this.paddingLeft =
            isLeft ?
                style.connectorHolderPaddingEdge! :
                style.connectorHolderPaddingCenter!;
        this.paddingRight =
            isLeft ?
                style.connectorHolderPaddingCenter! :
                style.connectorHolderPaddingEdge!;
        this.paddingTop = style.connectorHolderPaddingTop!;
    }
}
