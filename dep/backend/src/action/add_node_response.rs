use libflo_action_std::{ Action, action_str_id, NumberOrString };
use string;

#[derive(Clone, Debug, Eq, PartialEq, Serialize)]
pub struct AddNodeResponse<'a, 'b> {
    #[serde(rename = "type")]
    pub action_type: NumberOrString,
    pub index: usize,
    pub node_desc: usize,
    pub input_connectors: &'a Vec<usize>,
    pub output_connectors: &'b Vec<usize>
}

impl <'a, 'b> AddNodeResponse<'a, 'b> {
    pub fn new(index: usize, node_desc: usize, input_connectors: &'a Vec<usize>, output_connectors: &'b Vec<usize>) -> Self {
        AddNodeResponse {
            action_type: action_str_id(string::module(), string::add_node_response_action()),
            index: index,
            node_desc: node_desc,
            input_connectors: input_connectors,
            output_connectors: output_connectors
        }
    }
}

impl <'a, 'b> Action for AddNodeResponse<'a, 'b> {
    fn get_type(&self) -> &NumberOrString {
        &self.action_type
    }
}
