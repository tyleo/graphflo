import React from "guifast_shared/node_module/react";
import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

const getPath = (props: Graphflo.EdgeProps): string => {
    const startIndex = props.outputConnector.index;
    const start = props.workspaceData.nodeConnectorPositions[startIndex];
    const endIndex = props.outputConnector.connectedTo!;
    const end = props.workspaceData.nodeConnectorPositions[endIndex];

    const length = end.subtract(start);

    let ratio = length.x != 0 ? Math.abs(length.y / length.x) : 0;
    if (ratio > 1) {
        ratio = 1;
    }

    const startControl = new Guifast.Vector2(length.x * ratio, 0);
    const endControl = new Guifast.Vector2(length.x - length.x * ratio, length.y);

    return (
        "M" + start.x.toString() + "," + start.y.toString() +
        " c" +
        startControl.x.toString() + "," + startControl.y.toString() + " " +
        endControl.x.toString() + "," + endControl.y.toString() + " " +
        length.x.toString() + "," + length.y.toString()
    );
}


export const EdgeComponent = (props: Graphflo.EdgeProps) => (
    <svg preserveAspectRatio="none" stroke="white" fillOpacity="0" strokeWidth="5" viewBox="0 0 10000 10000" style={ new Graphflo.EdgeCss() }>
        <path
            onClick={ (e) => { } }
            style={ { pointerEvents: "visibleStroke" } }
            d={ getPath(props) }/>
    </svg>
);
