use error::*;
use serialization::{ NodeConnectorDescs, NodeDesc };
use state::{ Graph };

pub struct Node {
    node_desc: usize,
    index: usize,
    input_node_connector_indices: Vec<usize>,
    output_node_connector_indices: Vec<usize>,
}

impl Node {
    pub fn new(index: usize, node_desc_index: usize, graph: &mut Graph, node_descs: &Vec<NodeDesc>) -> Result<Self> {
        let node_desc = node_descs.get(node_desc_index).ok_or::<Error>(ErrorKind::NoNodeDescFound(node_desc_index).into())?;
        // Required so that we can get a reference to an empty vec
        let temp_vec = Vec::new();

        let input_node_connector_indices: Vec<_> =
            match node_desc.left_connectors {
                NodeConnectorDescs::none => &temp_vec,
                NodeConnectorDescs::constant(ref descs) => descs,
                NodeConnectorDescs::variable(_) => &temp_vec,
            }.into_iter()
            .map(|_| graph.add_node_connector())
            .collect();

        let output_node_connector_indices: Vec<_> =
            match node_desc.right_connectors {
                NodeConnectorDescs::none => &temp_vec,
                NodeConnectorDescs::constant(ref descs) => descs,
                NodeConnectorDescs::variable(_) => &temp_vec,
            }.into_iter()
            .map(|_| graph.add_node_connector())
            .collect();

        Ok(
            Node {
                node_desc: node_desc_index,
                index: index,
                input_node_connector_indices: input_node_connector_indices,
                output_node_connector_indices: output_node_connector_indices
            }
        )
    }

    pub fn get_input_connectors(&self) -> &Vec<usize> {
        &self.input_node_connector_indices
    }

    pub fn get_output_connectors(&self) -> &Vec<usize> {
        &self.output_node_connector_indices
    }

    pub fn get_input_connector_index(&self, index: usize) -> Result<usize> {
        let self_index = self.get_index();
        match self.input_node_connector_indices.get(index) {
            Some(ok) => Ok(*ok),
            None => Err(ErrorKind::ConnectorNotFound(self_index, index).into()),
        }
    }

    pub fn get_output_connector_index(&self, index: usize) -> Result<usize> {
        let self_index = self.get_index();
        match self.output_node_connector_indices.get(index) {
            Some(ok) => Ok(*ok),
            None => Err(ErrorKind::ConnectorNotFound(self_index, index).into())
        }
    }

    pub fn get_index(&self) -> usize {
        self.index
    }

    pub fn get_node_desc(&self) -> usize {
        self.node_desc
    }
}
