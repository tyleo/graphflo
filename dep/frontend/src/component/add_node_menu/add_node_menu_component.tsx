import React from "guifast_shared/node_module/react";
import { KeyCode } from "guifast_shared";
import { String } from "graphflo";
import { addNode, changeAddNodeMenuVisibility, nodeAddMenuInputChanged, selectAddNodeItem } from "graphflo/action";
import { AddNodeItemComponent, AddNodeMenuCss, AddNodeMenuProps, AddNodeMenuStyle, InputCss } from "graphflo/component";
import { StyleManager } from "graphflo/util";

import { sendToSharedRenderer, sendToLibflo } from "guifast_shared";

const mapManagerToStyle = (styleManager: StyleManager): AddNodeMenuStyle => {
    return {
        backgroundColor: styleManager.secondaryBackgroundColor,
        borderColor: styleManager.unfocusColor,
        borderThickness: styleManager.unfocusBorderThickness,
        font: styleManager.font,
        fontLeftRightPadding: styleManager.paddingToSimilarItems,
        fontSize: styleManager.titleFontSize,
        fontTopBottomPadding: styleManager.paddingToSimilarItems,
        foregroundColor: styleManager.secondaryForegroundColor,
        separatorColor: styleManager.unfocusColor,
        separatorHeight: styleManager.separatorHeight
    };
};

const onClick = (e: React.MouseEvent<any>, inputElement: HTMLInputElement | undefined) => {
    if (inputElement !== undefined) {
        inputElement.focus();
    }
};

const onInputChange = (e: React.FormEvent<any>, props: AddNodeMenuProps) => {
    const target = e.target as HTMLInputElement;
    if (props.state.moduleId !== undefined) {
        sendToSharedRenderer(nodeAddMenuInputChanged(target.value));
    } else {
        target.value = "";
    }
};

const onInputKeyDown = (e: React.KeyboardEvent<any>, props: AddNodeMenuProps) => {
    const state = props.state;

    switch (e.keyCode) {
        case KeyCode.Up: {
            if (state.selectedFilteredItem > 0) {
                sendToSharedRenderer(selectAddNodeItem(state.selectedFilteredItem - 1));
            }
            break;
        }

        case KeyCode.Down: {
            if (state.selectedFilteredItem < state.filteredItems.length - 1) {
                sendToSharedRenderer(selectAddNodeItem(state.selectedFilteredItem + 1));
            }
            break;
        }

        case KeyCode.Enter: {
            const selectedFilteredItem = state.filteredItems[state.selectedFilteredItem];
            const selectedItem = state.addNodeItems[selectedFilteredItem];
            sendToSharedRenderer(changeAddNodeMenuVisibility(false));
            sendToLibflo(addNode(selectedItem.key));
            break;
        }
    }
};

const onInputMounted = (e: HTMLInputElement) => {
    e.focus();
};

const renderSeparator = (style: AddNodeMenuStyle, key: number) => {
    return (
        <div key={ "Separator: " + key } style={ { background: style.separatorColor!, height: style.separatorHeight!, width: "100%" } }/>
    );
};

const renderAddNodeItems = (props: AddNodeMenuProps, style: AddNodeMenuStyle) => {
    const result = new Array<any>();
    let separatorIndex = 0;
    result.push(renderSeparator(style, separatorIndex));
    separatorIndex++;
    let index = 0;
    for (const nodeAddItemIndex of props.state.filteredItems) {
        const isSelected = index === props.state.selectedFilteredItem;

        const nodeAddItem = props.state.addNodeItems[nodeAddItemIndex];
        result.push(
            <AddNodeItemComponent
                filteredItemIndex={ index }
                isSelected={ isSelected }
                key={ nodeAddItemIndex }
                nodeDescs={ props.nodeDescs }
                styleManager={ props.styleManager }
                state={ nodeAddItem }/>
        );
        result.push(renderSeparator(style, separatorIndex));
        separatorIndex++;
        index++;
    }

    return result;
};

export const AddNodeMenuComponent = (props: AddNodeMenuProps) => {
    const state = props.state;
    const style = mapManagerToStyle(props.styleManager);

    let inputElement: HTMLInputElement | undefined = undefined;

    return (
        <div
            onClick={ e => onClick(e, inputElement) }
            onContextMenu={ e => onClick(e, inputElement) }
            style={ new AddNodeMenuCss(style, state) }>
            <input
                onChange={ e => onInputChange(e, props) }
                onKeyDown={ e => onInputKeyDown(e, props) }
                ref={ e => {
                    if (e !== null) {
                        inputElement = e;
                        onInputMounted(e);
                    }
                } }
                style={ new InputCss(style) }/>
            <div style={ { display: "flex", flexDirection: "column" } }>
                { renderAddNodeItems(props, style) }
            </div>
        </div>
    );
};
