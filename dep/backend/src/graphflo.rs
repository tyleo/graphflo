use libflo_std::MutStatic;
use environment::Environment;

lazy_static! {
    pub static ref GRAPHFLO: MutStatic<Environment> = {
        MutStatic::new()
    };
}
