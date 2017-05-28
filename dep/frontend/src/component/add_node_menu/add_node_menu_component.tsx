import React from "guifast_shared/node_module/react";
import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

const mapManagerToStyle = (styleManager: Graphflo.StyleManager): Graphflo.AddNodeMenuStyle => {
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

const onInputChange = (e: React.FormEvent<any>, props: Graphflo.AddNodeMenuProps) => {
    const target = e.target as HTMLInputElement;
    if (props.state.moduleId !== undefined) {
        Guifast.sendToSharedRenderer(Graphflo.NodeAddMenuInputChanged.make(target.value));
    } else {
        target.value = "";
    }
};

const onInputKeyDown = (e: React.KeyboardEvent<any>, props: Graphflo.AddNodeMenuProps) => {
    const state = props.state;

    switch (e.keyCode) {
        case Guifast.KeyCode.Up: {
            if (state.selectedFilteredItem > 0) {
                Guifast.sendToSharedRenderer(Graphflo.SelectAddNodeItem.make(state.selectedFilteredItem - 1));
            }
            break;
        }

        case Guifast.KeyCode.Down: {
            if (state.selectedFilteredItem < state.filteredItems.length - 1) {
                Guifast.sendToSharedRenderer(Graphflo.SelectAddNodeItem.make(state.selectedFilteredItem + 1));
            }
            break;
        }

        case Guifast.KeyCode.Enter: {
            const selectedFilteredItem = state.filteredItems[state.selectedFilteredItem];
            const selectedItem = state.addNodeItems[selectedFilteredItem];
            Guifast.sendToSharedRenderer(Graphflo.ChangeAddNodeMenuVisibility.make(false));
            Guifast.sendToLibflo(Graphflo.AddNode.make(selectedItem.key));
            break;
        }
    }
};

const onInputMounted = (e: HTMLInputElement) => {
    e.focus();
};

const renderSeparator = (style: Graphflo.AddNodeMenuStyle, key: number) => {
    return (
        <div key={ "Separator: " + key } style={ { background: style.separatorColor!, height: style.separatorHeight!, width: "100%" } }/>
    );
};

const renderAddNodeItems = (props: Graphflo.AddNodeMenuProps, style: Graphflo.AddNodeMenuStyle) => {
    const result = new Array<any>();
    let separatorIndex = 0;
    result.push(renderSeparator(style, separatorIndex));
    separatorIndex++;
    let index = 0;
    for (const nodeAddItemIndex of props.state.filteredItems) {
        const isSelected = index === props.state.selectedFilteredItem;

        const nodeAddItem = props.state.addNodeItems[nodeAddItemIndex];
        result.push(
            <Graphflo.AddNodeItemComponent
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

export const AddNodeMenuComponent = (props: Graphflo.AddNodeMenuProps) => {
    const state = props.state;
    const style = mapManagerToStyle(props.styleManager);

    let inputElement: HTMLInputElement | undefined = undefined;

    return (
        <div
            onClick={ e => onClick(e, inputElement) }
            onContextMenu={ e => onClick(e, inputElement) }
            style={ new Graphflo.AddNodeMenuCss(style, state) }>
            <input
                onChange={ e => onInputChange(e, props) }
                onKeyDown={ e => onInputKeyDown(e, props) }
                ref={ e => {
                    if (e !== null) {
                        inputElement = e;
                        onInputMounted(e);
                    }
                } }
                style={ new Graphflo.InputCss(style) }/>
            <div style={ { display: "flex", flexDirection: "column" } }>
                { renderAddNodeItems(props, style) }
            </div>
        </div>
    );
};
