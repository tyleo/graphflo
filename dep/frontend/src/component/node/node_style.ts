export interface NodeStyle {
    readonly backgroundColor?: string;
    readonly borderRadius?: number;
    readonly connectorHolderPaddingBottom?: number;
    readonly connectorHolderPaddingCenter?: number;
    readonly connectorHolderPaddingEdge?: number;
    readonly connectorHolderPaddingTop?: number;
    readonly deselectedBorderColor?: string;
    readonly deselectedBorderThickness?: number;
    readonly paddingBetweenNodeConnectors?: number;
    readonly selectedBorderColor?: string;
    readonly selectedBorderThickness?: number;
    readonly titleFont?: string;
    readonly titleFontColor?: string;
    readonly titleFontSize?: number;
    readonly titleFontWeight?: "normal" | "bold" | "lighter" | "bolder";
    readonly titleHeight?: number;
    readonly titlePaddingLeftRight?: number;
}
