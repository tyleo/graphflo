export class StyleManager {
    public readonly primaryBackgroundColor: string = "#282C34";
    public readonly secondaryBackgroundColor: string = "#21252B";

    public readonly focusColor: string = "#9EB2BF";
    public readonly unfocusColor: string = "#6A717C";

    public readonly secondaryHoverBackgroundColor: string = "#31363f";

    public readonly focusBorderThickness: number = 3;
    public readonly unfocusBorderThickness: number = 2;

    public readonly separatorHeight: number = 1;

    public readonly primaryForegroundColor: string = "#4B525B"
    public readonly secondaryForegroundColor: string = "#ABB2B1";

    public readonly font: string = "fira code";

    public readonly nodeTitleTextColor: string = "#000000";
    public readonly nodeTitleHeight: number = 30;

    public readonly titleFontSize: number = 20;
    public readonly titleFontWeight: "normal" | "bold" | "lighter" | "bolder" = "bold";

    public readonly headingFontSize: number = 16;
    public readonly headingFontWeight: "normal" | "bold" | "lighter" | "bolder" = "normal";

    public readonly workspaceBackgroundMajorLineThickness: number = 2;
    public readonly workspaceBackgroundMinorLineThickness: number = 1;
    public readonly workspaceBackgroundMajorLineInterval: number = 300;
    public readonly workspaceBackgroundMinorLineInterval: number = 30;

    public readonly nodeBorderRadius: number = 15;

    public readonly paddingToSimilarItems: number = 5;
    public readonly paddingToContainerEdge: number = 10;

    public readonly connectorShapeOutlineThickness: number = 2;
    public readonly connectorShapeSize: number = 15;
}
