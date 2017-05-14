import { Action, NumberMap, Vector2 } from "guifast_shared";
import { GetResponse, getResponseId, ChangeAddNodeMenuVisibility, changeAddNodeMenuVisibilityId, NodeAddMenuInputChanged, nodeAddMenuInputChangedId, SelectAddNodeItem, selectAddNodeItemId } from "graphflo/action";
import { addNodeItemReducer } from "graphflo/reducer"
import { KeyedNodeDesc } from "graphflo/serialization";
import { AddNodeItemState, AddNodeMenuState } from "graphflo/state";

import { UndefinedAction } from "guifast_shared/action";

const fuzzySearch = (items: Array<number>, nodeDescs: Array<KeyedNodeDesc>, searchString: string) => {
    const searchStringLower = searchString.toLowerCase();

    return items.filter(
            item => {
                const nodeDesc = nodeDescs[item];
                const titleLower = nodeDesc.node_desc.title.toLowerCase();
                if (titleLower.indexOf(searchStringLower) !== -1) {
                    return true;
                } else {
                    return false;
                }
            }
        );
};

const getSortedAddNodeItems = (items: Array<AddNodeItemState>, nodeDescs: Array<KeyedNodeDesc>) => {
    const itemsCopy = [...items];
    itemsCopy.sort(
        (lhs, rhs) => {
            const lhsTitle = nodeDescs[lhs.key!].node_desc.title.toLowerCase();
            const rhsTitle = nodeDescs[rhs.key!].node_desc.title.toLowerCase();
            if (lhsTitle < rhsTitle) {
                return -1;
            } else if (lhsTitle > rhsTitle) {
                return 1;
            } else {
                return 0;
            }
        }
    );
    return itemsCopy.map(item => item.key);
};

const noop = (state: AddNodeMenuState, action: Action): AddNodeMenuState => {
    return {
        addNodeItems: state.addNodeItems.map(item => addNodeItemReducer(item, action)),
        sortedAddNodeItems: state.sortedAddNodeItems,
        filteredItems: state.filteredItems,
        isVisible: state.isVisible,
        moduleId: state.moduleId,
        position: state.position,
        searchString: state.searchString,
        selectedFilteredItem: state.selectedFilteredItem,
        size: state.size,
    };
};

export const addNodeMenuReducer = (
    state: AddNodeMenuState = {
        addNodeItems: [],
        sortedAddNodeItems: [],
        filteredItems: [],
        isVisible: false,
        moduleId: undefined,
        position: new Vector2(100, 100),
        searchString: "",
        selectedFilteredItem: 0,
        size: new Vector2(400, 800)
    },
    action: Action = UndefinedAction.make(),
    nodeDescs: Array<KeyedNodeDesc>
): AddNodeMenuState => {
    switch (action.type) {
        case changeAddNodeMenuVisibilityId: {
            const changeNodeAddMenuVisibility = action as ChangeAddNodeMenuVisibility;

            const sortedAddNodeItems = state.sortedAddNodeItems;

            return {
                addNodeItems: state.addNodeItems.map(item => addNodeItemReducer(item, action)),
                sortedAddNodeItems: sortedAddNodeItems,
                filteredItems: [...sortedAddNodeItems],
                isVisible: changeNodeAddMenuVisibility.isVisible,
                moduleId: state.moduleId,
                position: state.position,
                searchString: "",
                selectedFilteredItem: 0,
                size: state.size,
            };
        }

        case getResponseId: {
            const getResponse = action as GetResponse;
            const addNodeItems = getResponse.node_descs.map(
                item => {
                    return {
                        key: item.key,
                        moduleId: state.moduleId
                    };
                }
            );

            return {
                addNodeItems: addNodeItems,
                sortedAddNodeItems: getSortedAddNodeItems(addNodeItems, nodeDescs),
                filteredItems: state.filteredItems,
                isVisible: state.isVisible,
                moduleId: state.moduleId,
                position: state.position,
                searchString: state.searchString,
                selectedFilteredItem: state.selectedFilteredItem,
                size: state.size,
            };
        }

        case nodeAddMenuInputChangedId: {
            const nodeAddMenuInputChanged = action as NodeAddMenuInputChanged;
            const searchString = nodeAddMenuInputChanged.value;
            const filteredItems = fuzzySearch(state.sortedAddNodeItems, nodeDescs, searchString);

            return {
                addNodeItems: state.addNodeItems.map(item => addNodeItemReducer(item, action)),
                sortedAddNodeItems: state.sortedAddNodeItems,
                filteredItems: filteredItems,
                isVisible: state.isVisible,
                moduleId: state.moduleId,
                position: state.position,
                searchString: searchString,
                selectedFilteredItem: 0,
                size: state.size,
            };
        }

        case selectAddNodeItemId: {
            const selectAddNodeItem = action as SelectAddNodeItem;

            return {
                addNodeItems: state.addNodeItems.map(item => addNodeItemReducer(item, action)),
                sortedAddNodeItems: state.sortedAddNodeItems,
                filteredItems: state.filteredItems,
                isVisible: state.isVisible,
                moduleId: state.moduleId,
                position: state.position,
                searchString: state.searchString,
                selectedFilteredItem: selectAddNodeItem.filteredItemIndex,
                size: state.size,
            };
        }

        default: {
            return noop(state, action);
        }
    }
};
