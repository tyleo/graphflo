import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

const fuzzySearch = (items: Array<number>, nodeDescs: Array<Graphflo.KeyedNodeDesc>, searchString: string) => {
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

const getSortedAddNodeItems = (items: Array<Graphflo.AddNodeItemState>, nodeDescs: Array<Graphflo.KeyedNodeDesc>) => {
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

const noop = (state: Graphflo.AddNodeMenuState, action: Guifast.Action): Graphflo.AddNodeMenuState => {
    return {
        addNodeItems: state.addNodeItems.map(item => Graphflo.addNodeItemReducer(item, action)),
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
    state: Graphflo.AddNodeMenuState = {
        addNodeItems: [],
        sortedAddNodeItems: [],
        filteredItems: [],
        isVisible: false,
        moduleId: undefined,
        position: new Guifast.Vector2(100, 100),
        searchString: "",
        selectedFilteredItem: 0,
        size: new Guifast.Vector2(400, 800)
    },
    action: Guifast.Action = Guifast.UndefinedAction.make(),
    nodeDescs: Array<Graphflo.KeyedNodeDesc>
): Graphflo.AddNodeMenuState => {
    switch (action.type) {
        case Graphflo.ChangeAddNodeMenuVisibility.id: {
            const changeNodeAddMenuVisibility = action as Graphflo.ChangeAddNodeMenuVisibility.Action;

            const sortedAddNodeItems = state.sortedAddNodeItems;

            return {
                addNodeItems: state.addNodeItems.map(item => Graphflo.addNodeItemReducer(item, action)),
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

        case Graphflo.GetResponse.id: {
            const getResponse = action as Graphflo.GetResponse.Action;
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

        case Graphflo.NodeAddMenuInputChanged.id: {
            const nodeAddMenuInputChanged = action as Graphflo.NodeAddMenuInputChanged.Action;
            const searchString = nodeAddMenuInputChanged.value;
            const filteredItems = fuzzySearch(state.sortedAddNodeItems, nodeDescs, searchString);

            return {
                addNodeItems: state.addNodeItems.map(item => Graphflo.addNodeItemReducer(item, action)),
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

        case Graphflo.SelectAddNodeItem.id: {
            const selectAddNodeItem = action as Graphflo.SelectAddNodeItem.Action;

            return {
                addNodeItems: state.addNodeItems.map(item => Graphflo.addNodeItemReducer(item, action)),
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
