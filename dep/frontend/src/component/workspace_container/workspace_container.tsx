import React from "guifast_shared/node_module/react"
import * as Graphflo from "graphflo";
import * as Guifast from "guifast_shared";

export const WorkspaceContainer: Guifast.Component = (state: Guifast.RootRendererState) => {
    const graphfloState = state.statesAndReducers["graphflo"]!.state as Graphflo.GraphfloState;
    const workspaceState = graphfloState.workspaceState;

    return (<Graphflo.WorkspaceComponent state={ workspaceState }/>);
};
