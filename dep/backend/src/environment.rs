use error::*;
use state::Graph;
use serialization::NodeDesc;
use std::sync::{ RwLock, RwLockReadGuard, RwLockWriteGuard };

pub struct Environment {
    graph: RwLock<Graph>,
    node_descriptions: RwLock<Vec<NodeDesc>>,
}

impl Environment {
    pub fn new(node_descriptions: Vec<NodeDesc>) -> Self {
        Environment {
            graph: RwLock::new(Graph::new()),
            node_descriptions: RwLock::new(node_descriptions)
        }
    }

    pub fn get_graph(&self) -> Result<RwLockReadGuard<Graph>> {
        self.graph.read().map_err(|err| ErrorKind::LockError(err.to_string()).into())
    }

    pub fn get_graph_mut(&self) -> Result<RwLockWriteGuard<Graph>> {
        self.graph.write().map_err(|err| ErrorKind::LockError(err.to_string()).into())
    }

    pub fn get_node_descriptions(&self) -> Result<RwLockReadGuard<Vec<NodeDesc>>> {
        self.node_descriptions.read().map_err(|err| ErrorKind::LockError(err.to_string()).into())
    }
}
