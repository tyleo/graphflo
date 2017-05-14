use { GRAPHFLO, guifast_shared };
use action::GetResponse;
use error::*;
use serialization::{ KeyedNodeDesc, NodeDesc };

pub unsafe fn get() -> Result<()> {
    let graphflo = GRAPHFLO.read()?;
    let node_descriptions = graphflo.get_node_descriptions()?;
    let node_descriptions_ref: &Vec<NodeDesc> = node_descriptions.as_ref();

    let keyed_node_descs: Vec<_> = node_descriptions_ref
        .into_iter()
        .enumerate()
        .map(
            |(index, desc)| KeyedNodeDesc::new(index, desc.clone())
        ).collect();
    let get_response = GetResponse::new(keyed_node_descs);
    guifast_shared::send_to_shared_store(&get_response)?;
    Ok(())
}
