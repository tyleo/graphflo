use error::*;
use libflo_std::{ file_from_path, text_from_file };
use serde_json;
use serialization::Resources;
use std::path::Path;

pub fn resources_from_path<TPath>(path: TPath) -> Result<Resources>
    where TPath: AsRef<Path> {
    let file = file_from_path(path)?;
    let text = text_from_file(file)?;
    resources_from_text(text)
}

pub fn resources_from_text(text: String) -> Result<Resources> {
    serde_json::from_str::<Resources>(&text)
        .map_err(|err| Error::from(ErrorKind::SerdeJsonError(err)))
        .chain_err(|| ErrorKind::ResourcesDeserializationFailure(text))
}
