use { GRAPHFLO, guifast_shared };
use action::{ AddNode, AddNodeResponse };
use error::*;

pub unsafe fn add_node(action: &AddNode) -> Result<()> {
    let graphflo = GRAPHFLO.read()?;

    let node_descs = graphflo.get_node_descriptions()?;
    let node_index = graphflo.get_graph_mut()?.add_node(action.node_desc, node_descs.as_ref())?;
    let graph = graphflo.get_graph()?;
    let node = graph.get_node(node_index)?;

    let add_node_response = AddNodeResponse::new(
        node_index,
        node.get_node_desc(),
        node.get_input_connectors(),
        node.get_output_connectors()
    );
    guifast_shared::send_to_shared_store(&add_node_response)?;
    Ok(())
}
