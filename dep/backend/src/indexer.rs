pub struct Indexer {
    min_free_index: usize,
    free_indices: Vec<usize>,
}

const RESERVATION_AMOUNT: isize = 10;

impl Indexer {
    pub fn new() -> Self {
        Indexer {
            min_free_index: 0,
            free_indices: Vec::new(),
        }
    }

    pub fn free_index(&mut self, value: usize) {
        self.free_indices.push(value);
    }

    pub fn get_next_index(&mut self) -> usize {
        if self.free_indices.len() <= 0 {
            self.reserve_indices(RESERVATION_AMOUNT);
        }

        self.free_indices.pop().unwrap()
    }

    fn get_next_min_index(&mut self) -> usize {
        let result = self.min_free_index;
        self.min_free_index += 1;
        result
    }

    fn reserve_indices(&mut self, value: isize) {
        let indices_to_reserve = (self.free_indices.len() as isize) - value;
        let indices_to_reserve = if indices_to_reserve <= 0 { 0 } else { indices_to_reserve };
        for _ in 0..indices_to_reserve {
            let next_index = self.get_next_min_index();
            self.free_indices.push(next_index);
        }
    }
}
