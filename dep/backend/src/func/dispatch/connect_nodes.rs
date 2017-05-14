use { GRAPHFLO, guifast_shared };
use action::{ ConnectNodes, ConnectNodesResponse };
use error::*;

pub unsafe fn connect_nodes(action: &ConnectNodes) -> Result<()> {
    let graphflo = GRAPHFLO.read()?;

    graphflo
        .get_graph_mut()?
        .connect_nodes(action.start_connector_index, action.finish_connector_index)?;

    let connect_nodes_response = ConnectNodesResponse::new(action.start_connector_index, action.finish_connector_index);
    guifast_shared::send_to_shared_store(&connect_nodes_response)?;
    Ok(())
}
