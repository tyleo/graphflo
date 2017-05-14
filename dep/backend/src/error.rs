use { guifast_shared, libflo_action_std, serde_json };
use libflo_std::{ libflo, module, mut_static };

error_chain! {
    types { }

    links {
        GuifastSharedError(guifast_shared::Error, guifast_shared::ErrorKind);
        LibfloActionError(libflo_action_std::Error, libflo_action_std::ErrorKind);
        LibfloError(libflo::Error, libflo::ErrorKind);
        LibfloModuleError(module::Error, module::ErrorKind);
        LibfloMutStatic(mut_static::Error, mut_static::ErrorKind);
    }

    foreign_links {
        SerdeJsonError(serde_json::Error);
    }

    errors {
        ConnectorNotFound(node_index: usize, node_connector_index: usize) {
            description("The node connector does not exist.")
            display(
                "{}{}{}{}{}",
                "The node connector, '",
                node_connector_index,
                "', does not exist on node, '",
                node_index,
                "'."
            )
        }

        ConstructEventNotPassedLibflo {
            description("The object passed to the construct event cannot be cast into an 'Libflo'.")
            display(
                "{}",
                "The object passed to the construct event cannot be cast into an 'Libflo'."
            )
        }

        DowncastFailure(expected_type: String) {
            description("Failed to cast into the expected type.")
            display(
                "{}{}{}",
                "Failed to cast into the expected type, '",
                expected_type,
                "'."
            )
        }

        EnvironmentIsIncorrectType {
            description("The graphflo environment cannot be downcasted. It is not the correct type.")
            display("The graphflo environment cannot be downcasted. It is not the correct type.")
        }

        EnvironmentNeverSet {
            description("The graphflo environment was never set.")
            display("The graphflo environment was never set.")
        }

        LockError(error_text: String) {
            description("Error acquiring lock.")
            display(
                "{}",
                error_text
            )
        }

        NoNodeConnectorFound(connector_index: usize) {
            description("Node connector could not be found.")
            display(
                "{}{}{}",
                "Node connector with index, '",
                connector_index,
                "', could not be found."
            )
        }

        NoNodeDescFound(node_desc_index: usize) {
            description("Node description could not be found.")
            display(
                "{}{}{}",
                "Node description with index, '",
                node_desc_index,
                "', could not be found."
            )
        }

        NoNodeFound(node_index: usize) {
            description("No node could be found with the requested index.")
            display(
                "{}{}{}",
                "No node could be found with the requested index, '",
                node_index,
                "'."
            )
        }

        NumberCannotNotBeConvertedIntoActionType(number: usize) {
            description("The number could not be converted into an action type.")
            display(
                "{}{}{}",
                "The number, '",
                number,
                "', could not be converted into an action type."
            )
        }

        ResourcesDeserializationFailure(resources_text: String) {
            description("Error deserializing resources text.")
            display(
                "{}{}{}",
                "Error deserializing resources text:\n",
                resources_text,
                "\nThe resources text could not be deserialized.",
            )
        }
    }
}
