use serialization::NodeConnectorDesc;

#[allow(non_camel_case_types)]
#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
pub enum NodeConnectorDescs {
    none,
    constant(Vec<NodeConnectorDesc>),
    variable(NodeConnectorDesc),
}
