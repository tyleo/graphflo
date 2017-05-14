use libflo_action_std::{ Action, action_str_id, NumberOrString };
use string;

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
pub struct ConnectNodesResponse {
    #[serde(rename = "type")]
    pub action_type: NumberOrString,
    pub start_connector_index: usize,
    pub finish_connector_index: usize,
}

impl ConnectNodesResponse {
    pub fn new(start_connector_index: usize, finish_connector_index: usize) -> Self {
        ConnectNodesResponse {
            action_type: action_str_id(string::module(), string::connect_nodes_response_action()),
            start_connector_index: start_connector_index,
            finish_connector_index: finish_connector_index,
        }
    }
}

impl Action for ConnectNodesResponse {
    fn get_type(&self) -> &NumberOrString {
        &self.action_type
    }
}
