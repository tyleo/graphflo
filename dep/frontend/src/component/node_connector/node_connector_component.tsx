import React from "guifast_shared/node_module/react";
import { Vector2 } from "guifast_shared";
import { String } from "graphflo";
import { connectNodes, setNodeConnectorPosition, startDraggingEdge, stopDraggingEdge } from "graphflo/action";
import { NodeConnectorCss, NodeConnectorProps, NodeConnectorShapeCss, NodeConnectorStyle, NodeConnectorTextCss, PaddingInNodeConnectorCss } from "graphflo/component";
import { NodeConnectorDesc } from "graphflo/serialization";
import { NodeConnectorState, NodeConnectorType } from "graphflo/state";
import { StyleManager } from "graphflo/util";

import { sendToSharedRenderer } from "guifast_shared/guifast/send_to_shared_renderer";
import { sendToLibflo } from "guifast_shared/guifast/send_to_libflo";

const getLeftNodeConnectorDesc = (props: NodeConnectorProps, state: NodeConnectorState): NodeConnectorDesc | undefined => {
    const leftConnectors = props.nodeDesc.left_connectors;
    if (leftConnectors.constant !== undefined) {
        return leftConnectors.constant[state.indexInNode];
    } else if (leftConnectors.variable !== undefined) {
        return leftConnectors.variable;
    } else {
        return undefined;
    }
};

const getRightNodeConnectorDesc = (props: NodeConnectorProps, state: NodeConnectorState): NodeConnectorDesc | undefined => {
    const rightConnectors = props.nodeDesc.right_connectors;
    if (rightConnectors.constant !== undefined) {
        return rightConnectors.constant[state.indexInNode];
    } else if (rightConnectors.variable !== undefined) {
        return rightConnectors.variable;
    } else {
        return undefined;
    }
};

const mapManagerToStyle = (styleManager: StyleManager): NodeConnectorStyle => {
    return {
        internalPadding: styleManager.paddingToSimilarItems,
        shapeOutlineThickness: styleManager.connectorShapeOutlineThickness,
        shapeSize: styleManager.connectorShapeSize,
        textFont: styleManager.font,
        textFontColor: styleManager.secondaryForegroundColor,
        textFontSize: styleManager.headingFontSize,
        textFontWeight: styleManager.headingFontWeight
    };
};

const onMouseDown = (e: React.MouseEvent<any>, props: NodeConnectorProps, state: NodeConnectorState) => {
    sendToSharedRenderer(startDraggingEdge(props.index, state.type));

    e.stopPropagation();
    e.preventDefault();
};

const onMouseUp = (e: React.MouseEvent<any>, props: NodeConnectorProps, state: NodeConnectorState) => {
    const connectNodeState = props.workspaceProps.state.connectNodeState;
    if (connectNodeState !== undefined) {
        switch (state.type) {
            case NodeConnectorType.Start: {
                if (connectNodeState.connectorType === NodeConnectorType.End) {
                    sendToLibflo(connectNodes(state.index, connectNodeState.connectorIndex));
                }
            }

            case NodeConnectorType.End: {
                if (connectNodeState.connectorType === NodeConnectorType.Start) {
                    sendToLibflo(connectNodes(connectNodeState.connectorIndex, state.index));
                }
            }
        }

        sendToSharedRenderer(stopDraggingEdge());
    }
};

const onShapeMounted = (e: HTMLDivElement, props: NodeConnectorProps, state: NodeConnectorState) => {
    if (e !== null) {
        const rect = e.getBoundingClientRect();
        const position =  new Vector2((rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2);
        if (state.position === undefined || position.x !== state.position.x || position.y !== state.position.y) {
            sendToSharedRenderer(setNodeConnectorPosition(props.index, position));
        }
        props.workspaceData.nodeConnectorPositions[props.index] = position;
    }
};

const renderLeft = (props: NodeConnectorProps, state: NodeConnectorState, style: NodeConnectorStyle) => {
    const nodeConnectorDesc = getLeftNodeConnectorDesc(props, state)!;
    const isConnected = state.connectedTo !== undefined;

    return (
        <div style={ new NodeConnectorCss() }>
            <div
                onMouseDown={ e => onMouseDown(e, props, state) }
                onMouseUp={ e => onMouseUp(e, props, state) }
                ref={ e => onShapeMounted(e, props, state) }
                style={ new NodeConnectorShapeCss(style, state.backgroundColor, isConnected) }/>
            <div style={ new PaddingInNodeConnectorCss(style) }/>
            <text style={ new NodeConnectorTextCss(style) }>{ nodeConnectorDesc.name }</text>
        </div>
    );
};

const renderRight = (props: NodeConnectorProps, state: NodeConnectorState, style: NodeConnectorStyle) => {
    const nodeConnectorDesc = getRightNodeConnectorDesc(props, state)!;
    const isConnected = state.connectedTo !== undefined;

    return (
        <div style={ new NodeConnectorCss() }>
            <text style={ new NodeConnectorTextCss(style) }>{ nodeConnectorDesc.name }</text>
            <div style={ new PaddingInNodeConnectorCss(style) }/>
            <div
                onMouseDown={ e => onMouseDown(e, props, state) }
                onMouseUp={ e => onMouseUp(e, props, state) }
                ref={ e => onShapeMounted(e, props, state) }
                style={ new NodeConnectorShapeCss(style, state.backgroundColor, isConnected) }/>
        </div>
    );
};

export const NodeConnectorComponent = (props: NodeConnectorProps) => {
    const style = mapManagerToStyle(props.workspaceProps.state.styleManager);
    const nodeConnectorsState = props.workspaceProps.state.nodeConnectorsState;
    if (nodeConnectorsState === undefined) {
        return (<noscript/>);
    }
    const connector = nodeConnectorsState.nodeConnectors[props.index];

    switch (connector.type) {
        case NodeConnectorType.Start: {
            return renderRight(props, connector, style);
        }

        case NodeConnectorType.End: {
            return renderLeft(props, connector, style);
        }

        default: {
            return (<noscript/>);
        }
    }
};
