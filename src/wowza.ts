const axios = require("axios").default;
// Types
import { RequestPayload } from "../types/RequestPayload";
import { Entity } from "../types/Entity.d";
import { MethodTypes, WowzaInterface } from "../types/Wowza.d";
// Classes
import Settings from "./entities/app/helpers/Settings";

export const methods: MethodTypes = {
  POST: "POST",
  GET: "GET",
  DELETE: "DELETE",
  PUT: "PUT",
};

class Wowza implements WowzaInterface {
  settings: Settings;
  restURI: string;

  public constructor(settings: Settings) {
    this.settings = settings;
  }

  public getHost() {
    return this.settings.getHost();
  }

  public getServerInstance() {
    return this.settings.getServerInstance();
  }

  public getVHostInstance() {
    return this.settings.getVhostInstance();
  }

  private debug(str: any) {
    if (this.settings.isDebug()) {
      console.debug(str);
    }
  }

  sendRequest(
    url: string,
    payload: RequestPayload,
    entities: Entity[],
    method: string = methods.POST,
    queryParams?: string
  ) {
    if (payload) {
      const axiosOptions = {
        url,
        method,
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-type": "application/json; charset=utf-8",
        },
        data: payload,
        auth: {
          username: this.settings.getUsername(),
          password: this.settings.getPassword(),
        },
      };

      this.debug(axiosOptions);

      return axios(axiosOptions);
    }

    return Promise.reject(new Error("Missing props for sendRequest()"));
  }
}

export default Wowza;
