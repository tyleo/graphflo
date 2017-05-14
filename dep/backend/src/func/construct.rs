use { load, Environment, GRAPHFLO, try_init };
use error::*;
use libflo_std::{ impl_construct, LIBFLO, Result as FuncResult };
use std::any::Any;

#[no_mangle]
pub unsafe extern fn construct(arg: &Any) -> FuncResult<()> {
    impl_construct(
        arg,
        |arg| -> Result<()> {
            LIBFLO.set(arg.clone())?;

            try_init()?;

            let libflo = LIBFLO.read()?;
            let node_descs = load(libflo.get_module_mapper(), libflo.get_path_resolver())?;
            let graphflo_environment = Environment::new(node_descs);
            Ok(GRAPHFLO.set(graphflo_environment)?)
        }
    )
}
