use { file_funcs, string };
use libflo_std::{ ModuleMapper, PathResolver };
use error::*;
use serialization::NodeDesc;

pub fn load(
    module_mapper: &ModuleMapper,
    path_resolver: &PathResolver,
) -> Result<Vec<NodeDesc>> {
    let my_id = module_mapper.get(string::module())?;
    let resources_file_name = string::resources_file_name();

    let mut result_node_descriptions = Vec::new();
    for (_, module_id) in module_mapper.get_raw_map() {
        if let Some(resources_json_path) =  path_resolver.try_find_submodule_file_path(resources_file_name, *module_id, my_id)? {
            let resources_json = file_funcs::resources_from_path(resources_json_path)?;
            let node_descriptions = resources_json.destructure();

            if let Some(node_descriptions) = node_descriptions {
                for node_description in node_descriptions {
                    result_node_descriptions.push(node_description);
                }
            }
        }
    }

    Ok(result_node_descriptions)
}
