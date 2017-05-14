use { serde_json, string };
use dispatch::{ add_node, connect_nodes, get };
use error::*;
use action::{ AddNode, ConnectNodes };
use libflo_action_std::{ ACTION_MAPPER, BasicAction, dispatch_fn, DispatchMap, DISPATCH_MAP, parse_fn, ParseMap, PARSE_MAP };
use libflo_std::LIBFLO;

pub unsafe fn try_init() -> Result<()> {
    if ACTION_MAPPER.is_set()? && LIBFLO.is_set()? {
        let action_mapper = ACTION_MAPPER.read()?;
        let libflo = LIBFLO.read()?;
        let module_mapper = libflo.get_module_mapper();

        // Set up parser
        let add_node_parser = parse_fn(|arg| serde_json::from_str::<AddNode>(arg));
        let connect_nodes_parser = parse_fn(|arg| serde_json::from_str::<ConnectNodes>(arg));
        let get_parser = parse_fn(|arg| serde_json::from_str::<BasicAction>(arg));

        let parser = ParseMap::new(
            module_mapper,
            &action_mapper,
            vec![
                (string::module(), string::add_node_action(), add_node_parser),
                (string::module(), string::connect_nodes_action(), connect_nodes_parser),
                (string::module(), string::get_action(), get_parser),
            ]
        )?;

        PARSE_MAP.set(parser)?;

        // Set up dispatch map
        let add_node_dispatch = dispatch_fn(|arg| add_node(arg));
        let connect_nodes_dispatch = dispatch_fn(|arg| connect_nodes(arg));
        let get_dispatch = dispatch_fn(|_: &BasicAction| get());

        let dispatch_map = DispatchMap::new(
            module_mapper,
            &action_mapper,
            vec![
                (string::module(), string::add_node_action(), add_node_dispatch),
                (string::module(), string::connect_nodes_action(), connect_nodes_dispatch),
                (string::module(), string::get_action(), get_dispatch),
            ]
        )?;

        DISPATCH_MAP.set(dispatch_map)?;
    }

    Ok(())
}
