use libflo_action_std::{ Action, NumberOrString };

#[derive(Clone, Debug, Deserialize, Eq, PartialEq, Serialize)]
pub struct ConnectNodes {
    #[serde(rename = "type")]
    pub action_type: NumberOrString,
    pub start_connector_index: usize,
    pub finish_connector_index: usize,
}

impl Action for ConnectNodes {
    fn get_type(&self) -> &NumberOrString {
        &self.action_type
    }
}
