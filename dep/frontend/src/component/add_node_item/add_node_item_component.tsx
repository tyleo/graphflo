import React from "guifast_shared/node_module/react";
import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

const mapManagerToStyle = (styleManager: Graphflo.StyleManager): Graphflo.AddNodeItemStyle => {
    return {
        foregroundColor: styleManager.secondaryForegroundColor,
        font: styleManager.font,
        fontSize: styleManager.headingFontSize,
        hoverColor: styleManager.secondaryHoverBackgroundColor,
        leftRightMargin: styleManager.paddingToSimilarItems,
        topBottomMargin: styleManager.paddingToSimilarItems,
    };
};

const onClick = (e: React.MouseEvent<any>, props: Graphflo.AddNodeItemProps) => {
    Guifast.sendToSharedRenderer(Graphflo.ChangeAddNodeMenuVisibility.make(false));
    Guifast.sendToLibflo(Graphflo.AddNode.make(props.state.key));
};

const onMouseMove = (e: React.MouseEvent<any>, props: Graphflo.AddNodeItemProps) => {
    if (!props.isSelected) {
        Guifast.sendToSharedRenderer(Graphflo.SelectAddNodeItem.make(props.filteredItemIndex));
    }
};

export const AddNodeItemComponent = (props: Graphflo.AddNodeItemProps) => {
    const style = mapManagerToStyle(props.styleManager);
    const nodeDesc = props.nodeDescs[props.state.key];

    return (
        <div onClick={ e => onClick(e, props) } onMouseMove={ e => onMouseMove(e, props) } style={ { display: "flex", flexDirection: "column", backgroundColor: props.isSelected ? style.hoverColor : undefined } }>
            <text style={ new Graphflo.AddNodeItemTextCss(style) }>
                { nodeDesc.node_desc.title }
            </text>
        </div>
    );
}
