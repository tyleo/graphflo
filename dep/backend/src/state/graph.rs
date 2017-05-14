use error::*;
use serialization::{ NodeDesc };
use state::{ Node, NodeConnector };

pub struct Graph {
    node_connectors: Vec<Option<NodeConnector>>,
    nodes: Vec<Option<Node>>
}

impl Graph {
    pub fn new() -> Self {
        Graph {
            node_connectors: Vec::new(),
            nodes: Vec::new()
        }
    }

    pub fn add_node(&mut self, node_desc: usize, node_descs: &Vec<NodeDesc>) -> Result<usize> {
        let node_index = self.nodes.len();
        let new_node = Node::new(node_index, node_desc, self, node_descs)?;
        self.nodes.push(Some(new_node));
        Ok(node_index)
    }

    pub fn add_node_connector(&mut self) -> usize {
        let result = self.node_connectors.len();
        self.node_connectors.push(Some(NodeConnector::new(result)));
        result
    }

    pub fn connect_nodes(&mut self, start_connector_index: usize, finish_connector_index: usize) -> Result<()> {
        {
            let start_connector = self.get_node_connector_mut(start_connector_index)?;
            start_connector.set_connection(finish_connector_index);
        }

        {
            let finish_node = self.get_node_connector_mut(finish_connector_index)?;
            finish_node.set_connection(start_connector_index);
        }

        Ok(())
    }

    pub fn get_node(&self, node_index: usize) -> Result<&Node> {
        if let Some(&Some(ref some)) = self.nodes.get(node_index) {
            Ok(some)
        } else {
            Err(ErrorKind::NoNodeFound(node_index).into())
        }
    }

    pub fn get_node_mut(&mut self, node_index: usize) -> Result<&mut Node> {
        if let Some(&mut Some(ref mut some)) = self.nodes.get_mut(node_index) {
            Ok(some)
        } else {
            Err(ErrorKind::NoNodeFound(node_index).into())
        }
    }

    pub fn get_node_connector(&self, connector_index: usize) -> Result<&NodeConnector> {
        if let Some(&Some(ref some)) = self.node_connectors.get(connector_index) {
            Ok(some)
        } else {
            Err(ErrorKind::NoNodeConnectorFound(connector_index).into())
        }
    }

    pub fn get_node_connector_mut(&mut self, connector_index: usize) -> Result<&mut NodeConnector> {
        if let Some(&mut Some(ref mut some)) = self.node_connectors.get_mut(connector_index) {
            Ok(some)
        } else {
            Err(ErrorKind::NoNodeConnectorFound(connector_index).into())
        }
    }
}
