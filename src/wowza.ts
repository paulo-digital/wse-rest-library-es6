const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
import { RequestProperties } from "../types/RequestProperties.d";
import Settings from "./entities/app/helpers/settings";
import { Entity } from "./entities/entity.d";

type MethodTypes = {
  POST: string;
  GET: string;
  DELETE: string;
  PUT: string;
};

export const methods: MethodTypes = {
  POST: "POST",
  GET: "GET",
  DELETE: "DELETE",
  PUT: "PUT",
};

export interface wowzaInterface {
  settings: Settings;
  sendRequest(
    props: RequestProperties,
    entities: Entity[],
    verbType?: string,
    queryParams?: string
  ): any;
  preparePropertiesForRequest(props: RequestProperties): string;
}

class Wowza implements wowzaInterface {
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

  private debug(str: string) {
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

      const json = props;
      const body = JSON.stringify(json);

      let restURL = props.restURI;
      if (queryParams) restURL += `?${queryParams}`;

      this.debug(`JSON REQUEST to ${restURL} with verb ${verbType}: ${body}`);

      const xhr = new XMLHttpRequest();

      // Config the Request.

      xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
      xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhr.setRequestHeader("Content-Length:", body.length);

      if (this.settings.isUseDigest()) {
        xhr.withCredentials = true;
        xhr.open(
          verbType,
          restURL,
          true,
          this.settings.getUsername(),
          this.settings.getPassword()
        );
      } else {
        xhr.open(verbType, restURL);
      }

      return new Promise((resolve, reject) => {
        // Listeners.
        xhr.onreadystatechange = function () {
          if (this.readyState === this.DONE) {
            this.debug("Complete.\nBody length: " + this.responseText.length);
            this.debug("Body:\n" + this.responseText);
            resolve(JSON.parse(this.responseText));
          }
        };
        xhr.addEventListener("timeout", () => {
          reject(new Error("Request timeout"));
        });
        xhr.addEventListener("error", () => {
          reject(new Error("Network Failure"));
        });

        // Send.
        try {
          xhr.send(body);
        } catch (error) {
          reject(error);
        }
      });
    }

    return Promise.reject(new Error("Missing props."));
  }
}

export default Wowza;
