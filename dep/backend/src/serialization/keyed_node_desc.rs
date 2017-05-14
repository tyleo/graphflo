use serialization::NodeDesc;

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
pub struct KeyedNodeDesc {
    pub key: usize,
    pub node_desc: NodeDesc,
}

impl KeyedNodeDesc {
    pub fn new(key: usize, node_desc: NodeDesc) -> Self {
        KeyedNodeDesc{ key: key, node_desc: node_desc }
    }
}
