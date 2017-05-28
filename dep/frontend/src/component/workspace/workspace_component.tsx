import React from "guifast_shared/node_module/react";
import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

const mapManagerToStyle = (styleManager: Graphflo.StyleManager): Graphflo.WorkspaceStyle => {
    return {
        graphBackgroundColor: styleManager.primaryBackgroundColor,
        graphForegroundColor: styleManager.primaryForegroundColor,
        graphMajorLineInterval: styleManager.workspaceBackgroundMajorLineInterval,
        graphMajorLineThickness: styleManager.workspaceBackgroundMajorLineThickness,
        graphMinorLineInterval: styleManager.workspaceBackgroundMinorLineInterval,
        graphMinorLineThickness: styleManager.workspaceBackgroundMinorLineThickness
    };
};

const renderNodeAddMenu = (props: Graphflo.WorkspaceProps, key: number) => {
    const state = props.state.addNodeMenuState;
    if (state.isVisible) {
        return (
            <Graphflo.AddNodeMenuComponent
                key={ key }
                nodeDescs={ props.state.nodeDescs }
                styleManager={ props.state.styleManager }
                state={ state }/>
        );
    } else {
        return undefined;
    }
};

const onClick = (e: React.MouseEvent<any>, props: Graphflo.WorkspaceProps) => {
    if (props.state.addNodeMenuState.isVisible) {
        Guifast.sendToSharedRenderer(Graphflo.ChangeAddNodeMenuVisibility.make(false));
    }
};

const onMouseDown = (e: React.MouseEvent<any>, props: Graphflo.WorkspaceProps) => {
    Guifast.sendToSharedRenderer(Graphflo.SelectNode.make(undefined));
    Guifast.sendToSharedRenderer(Graphflo.StartDraggingNode.make(undefined, Guifast.Vector2.zero));
};

const onMouseUp = (e: React.MouseEvent<any>, props: Graphflo.WorkspaceProps) => {
    if (props.state.moveNodeState.movingNode !== undefined) {
        const moveNodeState = props.state.moveNodeState;
        const pageLocation = new Guifast.Vector2(e.pageX, e.pageY);
        const dragDistance = pageLocation.subtract(moveNodeState.moveBeginLocation);

        Guifast.sendToSharedRenderer(Graphflo.FinishDraggingNode.make(moveNodeState.movingNode!, dragDistance));
    }

    if (props.state.connectNodeState !== undefined) {
        Guifast.sendToSharedRenderer(Graphflo.StopDraggingEdge.make());
    }
};

export class WorkspaceComponent extends React.Component<Graphflo.WorkspaceProps, {}> {
    private readonly data = new Graphflo.WorkspaceData();

    private onContextMenu(e: React.MouseEvent<any>, props: Graphflo.WorkspaceProps) {
        if (!props.state.addNodeMenuState.isVisible) {
            const pageLocation = new Guifast.Vector2(e.pageX, e.pageY);
            const clickLocation = pageLocation.subtract(this.data.position).add(this.data.scrollPosition);

            Guifast.sendToSharedRenderer(Graphflo.SetAddNodeLocation.make(clickLocation));
            Guifast.sendToSharedRenderer(Graphflo.ChangeAddNodeMenuVisibility.make(true));
        }
    }

    public render() {
        const props = this.props;
        const style = mapManagerToStyle(props.state.styleManager);

        return (
            <div
                style={ { display: "flex", flex: 2, overflow: "hidden", position: "relative" } }>
                <div
                    ref={ e => {
                        if (e !== null) {
                            this.data.position = new Guifast.Vector2(e.offsetLeft, e.offsetTop);
                            e.addEventListener("scroll", () => this.data.scrollPosition = new Guifast.Vector2(e.scrollLeft, e.scrollTop));
                        }
                    } }
                    style={ { overflow: "scroll", position: "relative" } }>
                    { this.renderBody(props, style) }
                </div>
            </div>
        );
    }

    private renderBody(props: Graphflo.WorkspaceProps, style: Graphflo.WorkspaceStyle) {
        const result = new Array<any>();
        result.push(
            <div
                key={ 0 }
                onClick={ e => onClick(e, props) }
                onContextMenu={ e => this.onContextMenu(e, props) }
                onMouseDown={ e => onMouseDown(e, props) }
                onMouseUp={ e => onMouseUp(e, props) }
                style={ new Graphflo.WorkspaceBackgroundCss(style) }>
                <Graphflo.NodesComponent
                    key={ 0 }
                    nodeDescs={ props.state.nodeDescs }
                    state={ props.state.nodesState }
                    styleManager={ props.state.styleManager }
                    workspaceData={ this.data }
                    workspaceProps={ props }/>
                <Graphflo.EdgesComponent
                    key={ 1 }
                    workspaceData={ this.data }
                    workspaceProps={ props }/>
            </div>
        );
        result.push(renderNodeAddMenu(props, 2));
        return result;
    }
}
