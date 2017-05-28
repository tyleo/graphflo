import React from "guifast_shared/node_module/react";
import * as Graphflo from "graphflo";

const renderEdges = (props: Graphflo.EdgesProps) => {
    const nodeConnectors = props.workspaceProps.state.nodeConnectorsState;
    if (nodeConnectors === undefined) {
        return <noscript/>
    } else {
        const result = new Array<any>();
        for (const connector of nodeConnectors.nodeConnectors) {
            if (connector.type === Graphflo.NodeConnectorType.Start && connector.connectedTo !== undefined) {
                result.push(
                    <Graphflo.EdgeComponent
                        key={ connector.index }
                        outputConnector={ connector }
                        workspaceData={ props.workspaceData }
                        workspaceProps={ props.workspaceProps }/>
                );
            }
        }
        return result;
    }
};

export const EdgesComponent = (props: Graphflo.EdgesProps) => (
    <div style={{ height: 10000, pointerEvents: "none", position: "absolute", width: 10000 }}>
        { renderEdges(props) }
    </div>
);
