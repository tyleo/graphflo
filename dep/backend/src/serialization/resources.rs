use serialization::NodeDesc;
#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
pub struct Resources {
    pub node_descriptions: Option<Vec<NodeDesc>>,
}

impl Resources {
    pub fn destructure(self) -> (Option<Vec<NodeDesc>>) {
        (self.node_descriptions)
    }
}
