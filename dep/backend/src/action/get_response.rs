use libflo_action_std::{ Action, action_str_id, NumberOrString };
use serialization::KeyedNodeDesc;
use string;

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
pub struct GetResponse {
    #[serde(rename = "type")]
    pub action_type: NumberOrString,
    pub node_descs: Vec<KeyedNodeDesc>,
}

impl GetResponse {
    pub fn new(node_descs: Vec<KeyedNodeDesc>) -> Self {
        GetResponse {
            action_type: action_str_id(string::module(), string::get_response_action()),
            node_descs: node_descs,
        }
    }
}

impl Action for GetResponse {
    fn get_type(&self) -> &NumberOrString {
        &self.action_type
    }
}
