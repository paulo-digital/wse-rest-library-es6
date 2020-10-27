const axios = require("axios").default;
// Types
import { RequestProperties } from "../types/RequestProperties.d";
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

  getHost() {
    return this.settings.getHost();
  }

  getServerInstance() {
    return this.settings.getServerInstance();
  }

  getVHostInstance() {
    return this.settings.getVhostInstance();
  }

  private debug(str: any) {
    if (this.settings.isDebug()) {
      console.debug(str);
    }
  }

  sendRequest(
    props: RequestProperties,
    entities: Entity[],
    verbType: string = methods.POST,
    queryParams?: string
  ) {
    if (props && props.restURI) {
      const entityCount = entities.length;
      if (entityCount > 0) {
        entities.forEach((entity, i) => {
          const name = entity.getEntityName();
          props[name] = entity;
        });
      }

      let restURL = props.restURI;
      if (queryParams) restURL += `?${queryParams}`;

      const axiosOptions = {
        url: restURL,
        method: verbType,
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-type": "application/json; charset=utf-8",
        },
        withCredentials: this.settings.isUseDigest(),
        data: props,
        auth: {
          username: this.settings.getUsername(),
          password: this.settings.getPassword(),
        },
      };

      this.debug(axiosOptions);

      return axios(axiosOptions);
    }

    return Promise.reject(new Error("Missing props or props.restURI"));
  }
}

export default Wowza;
