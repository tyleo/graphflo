import * as Graphflo from "graphflo";

export class WorkspaceBackgroundCss {
    public readonly backgroundColor: string;
    public readonly backgroundImage: string;
    public readonly backgroundPosition: string;
    public readonly backgroundSize: string;

    // These need to adjust based on the farthest right node.
    // We also need to adjust for nodes which go off of the screen to the right or top
    public readonly minWidth: string = "10000px";
    public readonly minHeight: string = "10000px";

    public constructor(style: Graphflo.WorkspaceStyle) {
        this.backgroundColor = style.graphBackgroundColor!;
        this.backgroundImage = WorkspaceBackgroundCss.MakeBackgroundImage(
            style.graphForegroundColor!,
            style.graphMinorLineThickness!,
            style.graphForegroundColor!,
            style.graphMajorLineThickness!
        );
        this.backgroundPosition = WorkspaceBackgroundCss.MakeBackgroundPosition(
            style.graphMinorLineThickness!,
            style.graphMajorLineThickness!
        );
        this.backgroundSize = WorkspaceBackgroundCss.MakeBackgroundSize(
            style.graphMinorLineInterval!,
            style.graphMajorLineInterval!,
        );
    }

    private static MakeBackgroundImage(graphMinorLineColor: string, graphMinorLineThickness: number, graphMajorLineColor: string, graphMajorLineThickness: number): string {
        return (
            "linear-gradient(" + graphMinorLineColor + " " + graphMinorLineThickness + "px" + ", " + "transparent" + " " + "0px" + "), " +
            "linear-gradient(" + "90deg" + ", " + graphMinorLineColor + " " + graphMinorLineThickness + "px" + ", " + "transparent" + " " + "0px" + "), " +
            "linear-gradient(" + graphMajorLineColor + " " + graphMajorLineThickness + "px" + ", " + "transparent" + " " + "0px" + "), " +
            "linear-gradient(" + "90deg" + ", " + graphMajorLineColor + " " + graphMajorLineThickness + "px" + ", " + "transparent" + " " + "0px" + ")"
        );
    }

    private static MakeBackgroundPosition(graphMinorLineThickness: number, graphMajorLineThickness: number): string {
        const halfMinorLineThickness = graphMinorLineThickness / 2;
        const halfMajorLineThickness = graphMajorLineThickness / 2;

        return (
            -halfMinorLineThickness + "px" + " " + -halfMinorLineThickness + "px" + ", " +
            -halfMinorLineThickness + "px" + " " + -halfMinorLineThickness + "px" + ", " +
            -halfMajorLineThickness + "px" + " " + -halfMajorLineThickness + "px" + ", " +
            -halfMajorLineThickness + "px" + " " + -halfMajorLineThickness + "px"
        );
    }

    private static MakeBackgroundSize(graphMinorLineInterval: number, graphMajorLineInterval: number): string {
        return (
            graphMinorLineInterval + "px" + " " + graphMinorLineInterval + "px" + ", " +
            graphMinorLineInterval + "px" + " " + graphMinorLineInterval + "px" + ", " +
            graphMajorLineInterval + "px" + " " + graphMajorLineInterval + "px" + ", " +
            graphMajorLineInterval + "px" + " " + graphMajorLineInterval + "px"
        );
    }
}
