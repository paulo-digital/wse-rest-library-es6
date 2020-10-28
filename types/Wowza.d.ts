import { RequestPayload } from "./RequestPayload";
import { Entity } from "./Entity";
import Settings from "../src/entities/app/helpers/Settings";

export type MethodTypes = {
  POST: string;
  GET: string;
  DELETE: string;
  PUT: string;
};

export interface WowzaInterface {
  settings: Settings;
  sendRequest(
    uri: string,
    props: RequestPayload,
    entities: Entity[],
    verbType?: string,
    queryParams?: string
  ): any;
}
