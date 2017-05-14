import React from "guifast_shared/node_module/react"
import { NodeComponent, NodeProps, NodesProps } from "graphflo/component"
import { NodesState } from "graphflo/state";
import { StyleManager } from "graphflo/util";

const renderNodes = (props: NodesProps) => {
    return props.state.nodes.map(
        (node) => (
            <NodeComponent
                key={ node.index }
                nodeDescs={ props.nodeDescs }
                state={ node }
                styleManager={ props.styleManager }
                workspaceData={ props.workspaceData }
                workspaceProps={ props.workspaceProps }/>
        )
    );
};

export const NodesComponent = (props: NodesProps) => (
    <div style={{ height: 10000, position: "absolute", width: 10000 }}>
        { renderNodes(props) }
    </div>
);
