import React from "guifast_shared/node_module/react";
import { String } from "graphflo";
import { addNode, changeAddNodeMenuVisibility, selectAddNodeItem } from "graphflo/action";
import { AddNodeItemProps, AddNodeItemStyle, AddNodeItemTextCss } from "graphflo/component";
import { StyleManager } from "graphflo/util";

import { sendToSharedStore } from "guifast_shared/guifast/send_to_shared_store";
import { sendToLibflo } from "guifast_shared/guifast/send_to_libflo";

const mapManagerToStyle = (styleManager: StyleManager): AddNodeItemStyle => {
    return {
        foregroundColor: styleManager.secondaryForegroundColor,
        font: styleManager.font,
        fontSize: styleManager.headingFontSize,
        hoverColor: styleManager.secondaryHoverBackgroundColor,
        leftRightMargin: styleManager.paddingToSimilarItems,
        topBottomMargin: styleManager.paddingToSimilarItems,
    };
};

const onClick = (e: React.MouseEvent<any>, props: AddNodeItemProps) => {
    sendToSharedStore(changeAddNodeMenuVisibility(false));
    sendToLibflo(addNode(props.state.key));
};

const onMouseMove = (e: React.MouseEvent<any>, props: AddNodeItemProps) => {
    if (!props.isSelected) {
        sendToSharedStore(selectAddNodeItem(props.filteredItemIndex));
    }
};

export const AddNodeItemComponent = (props: AddNodeItemProps) => {
    const style = mapManagerToStyle(props.styleManager);
    const nodeDesc = props.nodeDescs[props.state.key];

    return (
        <div onClick={ e => onClick(e, props) } onMouseMove={ e => onMouseMove(e, props) } style={ { display: "flex", flexDirection: "column", backgroundColor: props.isSelected ? style.hoverColor : undefined } }>
            <text style={ new AddNodeItemTextCss(style) }>
                { nodeDesc.node_desc.title }
            </text>
        </div>
    );
}
