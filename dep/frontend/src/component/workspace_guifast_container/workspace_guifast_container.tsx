import React from "guifast_shared/node_module/react"
import { Component, RootRendererState } from "guifast_shared";
import { WorkspaceComponent } from "graphflo/component";
import { GraphfloState } from "graphflo/state";

export const WorkspaceGuifastContainer: Component = (state: RootRendererState) => {
    const graphfloState = state.rendererStates["graphflo"]! as GraphfloState;
    const workspaceState = graphfloState.workspaceState;

    return (<WorkspaceComponent state={ workspaceState }/>);
};
