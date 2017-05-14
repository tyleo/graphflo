import React from "guifast_shared/node_module/react";
import { Vector2 } from "guifast_shared";
import { EdgeCss, EdgeProps } from "graphflo/component";

const getPath = (props: EdgeProps): string => {
    const startIndex = props.outputConnector.index;
    const start = props.workspaceData.nodeConnectorPositions[startIndex];
    const endIndex = props.outputConnector.connectedTo!;
    const end = props.workspaceData.nodeConnectorPositions[endIndex];

    const length = end.subtract(start);

    let ratio = length.x != 0 ? Math.abs(length.y / length.x) : 0;
    if (ratio > 1) {
        ratio = 1;
    }

    const startControl = new Vector2(length.x * ratio, 0);
    const endControl = new Vector2(length.x - length.x * ratio, length.y);

    return (
        "M" + start.x.toString() + "," + start.y.toString() +
        " c" +
        startControl.x.toString() + "," + startControl.y.toString() + " " +
        endControl.x.toString() + "," + endControl.y.toString() + " " +
        length.x.toString() + "," + length.y.toString()
    );
}


export const EdgeComponent = (props: EdgeProps) => (
    <svg preserveAspectRatio="none" stroke="white" fillOpacity="0" strokeWidth="5" viewBox="0 0 10000 10000" style={ new EdgeCss() }>
        <path
            onClick={ (e) => { } }
            style={ { pointerEvents: "visibleStroke" } }
            d={ getPath(props) }/>
    </svg>
);
