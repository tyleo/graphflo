import React from "guifast_shared/node_module/react";
import { Vector2 } from "guifast_shared";
import { changeAddNodeMenuVisibility, selectNode, startDraggingNode } from "graphflo/action";
import { LeftRightNodeConnectorHolderCss, MainNodeConnectorHolderCss, MainNodeConnectorHolderPaddingCss, NodeConnectorComponent, NodeCss, NodeProps, NodeStyle, NodeTitleDivCss, NodeTitleTextCss, PaddingBetweenNodeConnectorsCss } from "graphflo/component";
import { NodeDesc } from "graphflo/serialization";
import { StyleManager } from "graphflo/util";

import { sendToSharedRenderer } from "guifast_shared/guifast/send_to_shared_renderer";

const getRepositionDueToBorderThickness = (props: NodeProps, style: NodeStyle): Vector2 => {
    if (props.state.isSelected) {
        const borderThicknessDifference = Math.abs(style.selectedBorderThickness! - style.deselectedBorderThickness!);
        return new Vector2(borderThicknessDifference, borderThicknessDifference);
    } else {
        return Vector2.zero;
    }
}

const mapManagerToStyle = (styleManager: StyleManager): NodeStyle => {
    return {
        backgroundColor: styleManager.secondaryBackgroundColor,
        borderRadius: styleManager.nodeBorderRadius,
        connectorHolderPaddingBottom: styleManager.paddingToContainerEdge,
        connectorHolderPaddingCenter: styleManager.paddingToContainerEdge,
        connectorHolderPaddingEdge: styleManager.paddingToContainerEdge,
        connectorHolderPaddingTop: styleManager.paddingToContainerEdge,
        deselectedBorderColor: styleManager.unfocusColor,
        deselectedBorderThickness: styleManager.unfocusBorderThickness,
        paddingBetweenNodeConnectors: styleManager.paddingToSimilarItems,
        selectedBorderColor: styleManager.focusColor,
        selectedBorderThickness: styleManager.focusBorderThickness,
        titleFont: styleManager.font,
        titleFontColor: styleManager.nodeTitleTextColor,
        titleFontSize: styleManager.titleFontSize,
        titleFontWeight: styleManager.titleFontWeight,
        titleHeight: styleManager.nodeTitleHeight,
        titlePaddingLeftRight: styleManager.paddingToContainerEdge
    };
}

const onMouseDown = (e: React.MouseEvent<any>, props: NodeProps) => {
    const pageLocation = new Vector2(e.pageX, e.pageY);
    sendToSharedRenderer(selectNode(props.state.index));
    sendToSharedRenderer(startDraggingNode(props.state.index, pageLocation));

    e.stopPropagation();
    e.preventDefault();
};

const renderLeftConnectors = (props: NodeProps, nodeDesc: NodeDesc, style: NodeStyle) => {
    const inputConnectors = props.state.inputConnectors;

    const result = new Array<any>();
    let keyIndex = 0;
    for (const connector of inputConnectors) {
        result.push(
            <NodeConnectorComponent
                key={ keyIndex }
                index={ connector }
                nodeDesc={ nodeDesc }
                workspaceData={ props.workspaceData }
                workspaceProps={ props.workspaceProps }/>
        );
        keyIndex++;
        result.push(
            <div key={ keyIndex } style={ new PaddingBetweenNodeConnectorsCss(style) }/>
        );
        keyIndex++;
    }

    if (result.length !== 0) {
        result.pop();
    }

    return result;
};

const renderRightConnectors = (props: NodeProps, nodeDesc: NodeDesc, style: NodeStyle) => {
    const outputConnectors = props.state.outputConnectors;

    const result = new Array<any>();
    let keyIndex = 0;
    for (const connector of outputConnectors) {
        result.push(
            <NodeConnectorComponent
                key={ keyIndex }
                index={ connector }
                nodeDesc={ nodeDesc }
                workspaceData={ props.workspaceData }
                workspaceProps={ props.workspaceProps }/>
        );
        keyIndex++;
        result.push(
            <div key={ keyIndex } style={ new PaddingBetweenNodeConnectorsCss(style) }/>
        );
        keyIndex++;
    }

    if (result.length !== 0) {
        result.pop();
    }

    return result;
};

export const NodeComponent = (props: NodeProps) => {
    const state = props.state;
    const style = mapManagerToStyle(props.styleManager);
    const nodeDesc = props.nodeDescs[props.state.nodeDescIndex].node_desc;

    return (
        <div
            onMouseDown={ e => onMouseDown(e, props) }
            style={ new NodeCss(style, state.isSelected, state.extents, state.position.subtract(getRepositionDueToBorderThickness(props, style))) }>
            <div style={ new NodeTitleDivCss(style, "#c678d7") }>
                <text style={ new NodeTitleTextCss(style) }>{ nodeDesc.title }</text>
            </div>
            <div style={ new MainNodeConnectorHolderCss() }>
                <div style={ new LeftRightNodeConnectorHolderCss(style, true) }>
                    { renderLeftConnectors(props, nodeDesc, style) }
                </div>

                <div style={ new MainNodeConnectorHolderPaddingCss() }/>

                <div style={ new LeftRightNodeConnectorHolderCss(style, false) }>
                    { renderRightConnectors(props, nodeDesc, style) }
                </div>
            </div>
        </div>
    );
}
