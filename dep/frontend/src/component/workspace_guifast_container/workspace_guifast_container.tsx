import React from "guifast_shared/node_module/react"
import { Component, State } from "guifast_shared";
import { WorkspaceComponent } from "graphflo/component";
import { GraphfloState } from "graphflo/state";

export const WorkspaceGuifastContainer: Component = (state: State) => {
    const graphfloState = state.modulesState["graphflo"]! as GraphfloState;
    const workspaceState = graphfloState.workspaceState;

    return (<WorkspaceComponent state={ workspaceState }/>);
};
