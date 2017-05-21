import React from "guifast_shared/node_module/react";
import { MouseButton, Vector2 } from "guifast_shared";
import { changeAddNodeMenuVisibility, finishDraggingNode, selectNode, setAddNodeLocation, startDraggingNode, stopDraggingEdge } from "graphflo/action";
import { AddNodeMenuComponent, EdgesComponent, NodesComponent, WorkspaceBackgroundCss, WorkspaceData, WorkspaceProps, WorkspaceStyle } from "graphflo/component";
import { AddNodeMenuState } from "graphflo/state";
import { StyleManager } from "graphflo/util";

import { sendToSharedRenderer } from "guifast_shared/guifast/send_to_shared_renderer";

const mapManagerToStyle = (styleManager: StyleManager): WorkspaceStyle => {
    return {
        graphBackgroundColor: styleManager.primaryBackgroundColor,
        graphForegroundColor: styleManager.primaryForegroundColor,
        graphMajorLineInterval: styleManager.workspaceBackgroundMajorLineInterval,
        graphMajorLineThickness: styleManager.workspaceBackgroundMajorLineThickness,
        graphMinorLineInterval: styleManager.workspaceBackgroundMinorLineInterval,
        graphMinorLineThickness: styleManager.workspaceBackgroundMinorLineThickness
    };
};

const renderNodeAddMenu = (props: WorkspaceProps, key: number) => {
    const state = props.state.addNodeMenuState;
    if (state.isVisible) {
        return (
            <AddNodeMenuComponent
                key={ key }
                nodeDescs={ props.state.nodeDescs }
                styleManager={ props.state.styleManager }
                state={ state }/>
        );
    } else {
        return undefined;
    }
};

const onClick = (e: React.MouseEvent<any>, props: WorkspaceProps) => {
    if (props.state.addNodeMenuState.isVisible) {
        sendToSharedRenderer(changeAddNodeMenuVisibility(false));
    }
};

const onMouseDown = (e: React.MouseEvent<any>, props: WorkspaceProps) => {
    sendToSharedRenderer(selectNode(undefined));
    sendToSharedRenderer(startDraggingNode(undefined, Vector2.zero));
};

const onMouseUp = (e: React.MouseEvent<any>, props: WorkspaceProps) => {
    if (props.state.moveNodeState.movingNode !== undefined) {
        const moveNodeState = props.state.moveNodeState;
        const pageLocation = new Vector2(e.pageX, e.pageY);
        const dragDistance = pageLocation.subtract(moveNodeState.moveBeginLocation);

        sendToSharedRenderer(finishDraggingNode(moveNodeState.movingNode!, dragDistance));
    }

    if (props.state.connectNodeState !== undefined) {
        sendToSharedRenderer(stopDraggingEdge());
    }
};

export class WorkspaceComponent extends React.Component<WorkspaceProps, {}> {
    private readonly data = new WorkspaceData();

    private onContextMenu(e: React.MouseEvent<any>, props: WorkspaceProps) {
        if (!props.state.addNodeMenuState.isVisible) {
            const pageLocation = new Vector2(e.pageX, e.pageY);
            const clickLocation = pageLocation.subtract(this.data.position).add(this.data.scrollPosition);

            sendToSharedRenderer(setAddNodeLocation(clickLocation));
            sendToSharedRenderer(changeAddNodeMenuVisibility(true));
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
                            this.data.position = new Vector2(e.offsetLeft, e.offsetTop);
                            e.addEventListener("scroll", () => this.data.scrollPosition = new Vector2(e.scrollLeft, e.scrollTop));
                        }
                    } }
                    style={ { overflow: "scroll", position: "relative" } }>
                    { this.renderBody(props, style) }
                </div>
            </div>
        );
    }

    private renderBody(props: WorkspaceProps, style: WorkspaceStyle) {
        const result = new Array<any>();
        result.push(
            <div
                key={ 0 }
                onClick={ e => onClick(e, props) }
                onContextMenu={ e => this.onContextMenu(e, props) }
                onMouseDown={ e => onMouseDown(e, props) }
                onMouseUp={ e => onMouseUp(e, props) }
                style={ new WorkspaceBackgroundCss(style) }>
                <NodesComponent
                    key={ 0 }
                    nodeDescs={ props.state.nodeDescs }
                    state={ props.state.nodesState }
                    styleManager={ props.state.styleManager }
                    workspaceData={ this.data }
                    workspaceProps={ props }/>
                <EdgesComponent
                    key={ 1 }
                    workspaceData={ this.data }
                    workspaceProps={ props }/>
            </div>
        );
        result.push(renderNodeAddMenu(props, 2));
        return result;
    }
}
