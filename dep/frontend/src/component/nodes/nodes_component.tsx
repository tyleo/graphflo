import React from "guifast_shared/node_module/react"
import * as Graphflo from "graphflo";

const renderNodes = (props: Graphflo.NodesProps) => {
    return props.state.nodes.map(
        (node) => (
            <Graphflo.NodeComponent
                key={ node.index }
                nodeDescs={ props.nodeDescs }
                state={ node }
                styleManager={ props.styleManager }
                workspaceData={ props.workspaceData }
                workspaceProps={ props.workspaceProps }/>
        )
    );
};

export const NodesComponent = (props: Graphflo.NodesProps) => (
    <div style={{ height: 10000, position: "absolute", width: 10000 }}>
        { renderNodes(props) }
    </div>
);
