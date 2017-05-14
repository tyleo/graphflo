use libflo_action_std::{ Action, NumberOrString };

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
pub struct AddNode {
    #[serde(rename = "type")]
    pub action_type: NumberOrString,
    pub node_desc: usize,
}

impl Action for AddNode {
    fn get_type(&self) -> &NumberOrString {
        &self.action_type
    }
}
