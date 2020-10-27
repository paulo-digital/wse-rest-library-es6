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
    uri: string,
    props: RequestProperties,
    entities: Entity[],
    verbType: string = methods.POST,
    queryParams?: string
  ) {
    if (props) {
      // const entityCount = entities.length;
      // if (entityCount > 0) {
      //   entities.forEach((entity, i) => {
      //     const name = entity.getEntityName();
      //     props[name] = entity;
      //   });
      // }

      const axiosOptions = {
        url: uri,
        method: verbType,
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-type": "application/json; charset=utf-8",
        },
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
