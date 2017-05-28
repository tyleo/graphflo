import React from "guifast_shared/node_module/react";
import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

const getRepositionDueToBorderThickness = (props: Graphflo.NodeProps, style: Graphflo.NodeStyle): Guifast.Vector2 => {
    if (props.state.isSelected) {
        const borderThicknessDifference = Math.abs(style.selectedBorderThickness! - style.deselectedBorderThickness!);
        return new Guifast.Vector2(borderThicknessDifference, borderThicknessDifference);
    } else {
        return Guifast.Vector2.zero;
    }
}

const mapManagerToStyle = (styleManager: Graphflo.StyleManager): Graphflo.NodeStyle => {
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

const onMouseDown = (e: React.MouseEvent<any>, props: Graphflo.NodeProps) => {
    const pageLocation = new Guifast.Vector2(e.pageX, e.pageY);
    Guifast.sendToSharedRenderer(Graphflo.SelectNode.make(props.state.index));
    Guifast.sendToSharedRenderer(Graphflo.StartDraggingNode.make(props.state.index, pageLocation));

    e.stopPropagation();
    e.preventDefault();
};

const renderLeftConnectors = (props: Graphflo.NodeProps, nodeDesc: Graphflo.NodeDesc, style: Graphflo.NodeStyle) => {
    const inputConnectors = props.state.inputConnectors;

    const result = new Array<any>();
    let keyIndex = 0;
    for (const connector of inputConnectors) {
        result.push(
            <Graphflo.NodeConnectorComponent
                key={ keyIndex }
                index={ connector }
                nodeDesc={ nodeDesc }
                workspaceData={ props.workspaceData }
                workspaceProps={ props.workspaceProps }/>
        );
        keyIndex++;
        result.push(
            <div key={ keyIndex } style={ new Graphflo.PaddingBetweenNodeConnectorsCss(style) }/>
        );
        keyIndex++;
    }

    if (result.length !== 0) {
        result.pop();
    }

    return result;
};

const renderRightConnectors = (props: Graphflo.NodeProps, nodeDesc: Graphflo.NodeDesc, style: Graphflo.NodeStyle) => {
    const outputConnectors = props.state.outputConnectors;

    const result = new Array<any>();
    let keyIndex = 0;
    for (const connector of outputConnectors) {
        result.push(
            <Graphflo.NodeConnectorComponent
                key={ keyIndex }
                index={ connector }
                nodeDesc={ nodeDesc }
                workspaceData={ props.workspaceData }
                workspaceProps={ props.workspaceProps }/>
        );
        keyIndex++;
        result.push(
            <div key={ keyIndex } style={ new Graphflo.PaddingBetweenNodeConnectorsCss(style) }/>
        );
        keyIndex++;
    }

    if (result.length !== 0) {
        result.pop();
    }

    return result;
};

export const NodeComponent = (props: Graphflo.NodeProps) => {
    const state = props.state;
    const style = mapManagerToStyle(props.styleManager);
    const nodeDesc = props.nodeDescs[props.state.nodeDescIndex].node_desc;

    return (
        <div
            onMouseDown={ e => onMouseDown(e, props) }
            style={ new Graphflo.NodeCss(style, state.isSelected, state.extents, state.position.subtract(getRepositionDueToBorderThickness(props, style))) }>
            <div style={ new Graphflo.NodeTitleDivCss(style, "#c678d7") }>
                <text style={ new Graphflo.NodeTitleTextCss(style) }>{ nodeDesc.title }</text>
            </div>
            <div style={ new Graphflo.MainNodeConnectorHolderCss() }>
                <div style={ new Graphflo.LeftRightNodeConnectorHolderCss(style, true) }>
                    { renderLeftConnectors(props, nodeDesc, style) }
                </div>

                <div style={ new Graphflo.MainNodeConnectorHolderPaddingCss() }/>

                <div style={ new Graphflo.LeftRightNodeConnectorHolderCss(style, false) }>
                    { renderRightConnectors(props, nodeDesc, style) }
                </div>
            </div>
        </div>
    );
}
