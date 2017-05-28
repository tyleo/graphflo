import React from "guifast_shared/node_module/react";
import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

const getLeftNodeConnectorDesc = (props: Graphflo.NodeConnectorProps, state: Graphflo.NodeConnectorState): Graphflo.NodeConnectorDesc | undefined => {
    const leftConnectors = props.nodeDesc.left_connectors;
    if (leftConnectors.constant !== undefined) {
        return leftConnectors.constant[state.indexInNode];
    } else if (leftConnectors.variable !== undefined) {
        return leftConnectors.variable;
    } else {
        return undefined;
    }
};

const getRightNodeConnectorDesc = (props: Graphflo.NodeConnectorProps, state: Graphflo.NodeConnectorState): Graphflo.NodeConnectorDesc | undefined => {
    const rightConnectors = props.nodeDesc.right_connectors;
    if (rightConnectors.constant !== undefined) {
        return rightConnectors.constant[state.indexInNode];
    } else if (rightConnectors.variable !== undefined) {
        return rightConnectors.variable;
    } else {
        return undefined;
    }
};

const mapManagerToStyle = (styleManager: Graphflo.StyleManager): Graphflo.NodeConnectorStyle => {
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

const onMouseDown = (e: React.MouseEvent<any>, props: Graphflo.NodeConnectorProps, state: Graphflo.NodeConnectorState) => {
    Guifast.sendToSharedRenderer(Graphflo.StartDraggingEdge.make(props.index, state.type));

    e.stopPropagation();
    e.preventDefault();
};

const onMouseUp = (e: React.MouseEvent<any>, props: Graphflo.NodeConnectorProps, state: Graphflo.NodeConnectorState) => {
    const connectNodeState = props.workspaceProps.state.connectNodeState;
    if (connectNodeState !== undefined) {
        switch (state.type) {
            case Graphflo.NodeConnectorType.Start: {
                if (connectNodeState.connectorType === Graphflo.NodeConnectorType.End) {
                    Guifast.sendToLibflo(Graphflo.ConnectNodes.make(state.index, connectNodeState.connectorIndex));
                }
            }

            case Graphflo.NodeConnectorType.End: {
                if (connectNodeState.connectorType === Graphflo.NodeConnectorType.Start) {
                    Guifast.sendToLibflo(Graphflo.ConnectNodes.make(connectNodeState.connectorIndex, state.index));
                }
            }
        }

        Guifast.sendToSharedRenderer(Graphflo.StopDraggingEdge.make());
    }
};

const onShapeMounted = (e: HTMLDivElement, props: Graphflo.NodeConnectorProps, state: Graphflo.NodeConnectorState) => {
    if (e !== null) {
        const rect = e.getBoundingClientRect();
        const position =  new Guifast.Vector2((rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2);
        if (state.position === undefined || position.x !== state.position.x || position.y !== state.position.y) {
            Guifast.sendToSharedRenderer(Graphflo.SetNodeConnectorPosition.make(props.index, position));
        }
        props.workspaceData.nodeConnectorPositions[props.index] = position;
    }
};

const renderLeft = (props: Graphflo.NodeConnectorProps, state: Graphflo.NodeConnectorState, style: Graphflo.NodeConnectorStyle) => {
    const nodeConnectorDesc = getLeftNodeConnectorDesc(props, state)!;
    const isConnected = state.connectedTo !== undefined;

    return (
        <div style={ new Graphflo.NodeConnectorCss() }>
            <div
                onMouseDown={ e => onMouseDown(e, props, state) }
                onMouseUp={ e => onMouseUp(e, props, state) }
                ref={ e => onShapeMounted(e, props, state) }
                style={ new Graphflo.NodeConnectorShapeCss(style, state.backgroundColor, isConnected) }/>
            <div style={ new Graphflo.PaddingInNodeConnectorCss(style) }/>
            <text style={ new Graphflo.NodeConnectorTextCss(style) }>{ nodeConnectorDesc.name }</text>
        </div>
    );
};

const renderRight = (props: Graphflo.NodeConnectorProps, state: Graphflo.NodeConnectorState, style: Graphflo.NodeConnectorStyle) => {
    const nodeConnectorDesc = getRightNodeConnectorDesc(props, state)!;
    const isConnected = state.connectedTo !== undefined;

    return (
        <div style={ new Graphflo.NodeConnectorCss() }>
            <text style={ new Graphflo.NodeConnectorTextCss(style) }>{ nodeConnectorDesc.name }</text>
            <div style={ new Graphflo.PaddingInNodeConnectorCss(style) }/>
            <div
                onMouseDown={ e => onMouseDown(e, props, state) }
                onMouseUp={ e => onMouseUp(e, props, state) }
                ref={ e => onShapeMounted(e, props, state) }
                style={ new Graphflo.NodeConnectorShapeCss(style, state.backgroundColor, isConnected) }/>
        </div>
    );
};

export const NodeConnectorComponent = (props: Graphflo.NodeConnectorProps) => {
    const style = mapManagerToStyle(props.workspaceProps.state.styleManager);
    const nodeConnectorsState = props.workspaceProps.state.nodeConnectorsState;
    if (nodeConnectorsState === undefined) {
        return (<noscript/>);
    }
    const connector = nodeConnectorsState.nodeConnectors[props.index];

    switch (connector.type) {
        case Graphflo.NodeConnectorType.Start: {
            return renderRight(props, connector, style);
        }

        case Graphflo.NodeConnectorType.End: {
            return renderLeft(props, connector, style);
        }

        default: {
            return (<noscript/>);
        }
    }
};
