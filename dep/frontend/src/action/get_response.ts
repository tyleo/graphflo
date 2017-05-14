import { String } from "graphflo";
import { KeyedNodeDesc } from "graphflo/serialization";
import { Action, actionStrId } from "guifast_shared";

export interface GetResponse extends Action {
    node_descs: Array<KeyedNodeDesc>
}

export const getResponseStr = "get_response";
export const getResponseId = actionStrId(String.module, getResponseStr);

export const getResponse = (nodeDescs: Array<KeyedNodeDesc>): GetResponse => {
    return {
        type: getResponseId,
        node_descs: nodeDescs
    };
};
