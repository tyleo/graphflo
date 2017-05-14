mod add_node;
mod connect_nodes;
mod get;

pub use self::add_node::*;
pub use self::connect_nodes::*;
pub use self::get::*;

use libflo_action_std::{ ACTION_MAPPER, DISPATCH_MAP, impl_dispatch };
use libflo_std::{ LIBFLO, Result as FuncResult };
use std::any::Any;

#[no_mangle]
pub extern fn dispatch(arg: &Any) -> FuncResult<()> {
    impl_dispatch(
        arg,
        |arg| {
            let dispatch_map = DISPATCH_MAP.read().unwrap();
            let libflo = LIBFLO.read().unwrap();
            let module_mapper = libflo.get_module_mapper();
            let action_mapper = ACTION_MAPPER.read().unwrap();
            dispatch_map.dispatch(arg, module_mapper, &action_mapper)
        }
    )
}
