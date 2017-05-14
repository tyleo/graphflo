pub struct NodeConnector {
    connected_to: Option<usize>,
    index: usize
}

impl NodeConnector {
    pub fn new(index: usize) -> Self {
        NodeConnector { connected_to: None, index: index }
    }

    pub fn clear_connection(&mut self) {
        self.connected_to = None;
    }

    pub fn get_connection(&self) -> Option<usize> {
        self.connected_to
    }

    pub fn get_index(&self) -> usize {
        self.index
    }

    pub fn set_connection(&mut self, connected_to: usize) {
        self.connected_to = Some(connected_to);
    }
}
