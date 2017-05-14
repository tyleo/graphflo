use serialization::NodeConnectorDescs;

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
pub struct NodeDesc {
    pub title: String,
    pub has_input: bool,
    pub has_output: bool,
    pub left_connectors: NodeConnectorDescs,
    pub right_connectors: NodeConnectorDescs,
    pub min_width: Option<u32>,
    pub min_height: Option<u32>,
}
