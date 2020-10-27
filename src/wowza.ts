const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
import settings from "./entities/app/helpers/settings";
import { Entity } from "./entities/entity.d";

type VerbTypes = {
  VERB_POST: string;
  VERB_GET: string;
  VERB_DELETE: string;
  VERB_PUT: string;
};

const verbs: VerbTypes = {
  VERB_POST: "POST",
  VERB_GET: "GET",
  VERB_DELETE: "DELETE",
  VERB_PUT: "PUT",
};

export interface wowzaInterface {
  settings: settings;
}

class wowza implements wowzaInterface {
  settings: settings;

  public constructor(settings: settings) {
    this.settings = settings;
  }

  private getHost() {
    return this.settings.getHost();
  }

  private getServerInstance() {
    return this.settings.getServerInstance();
  }

  private getVHostInstance() {
    return this.settings.getVhostInstance();
  }

  private debug(str: string) {
    if (this.settings.isDebug()) {
      console.debug(str);
    }
  }

  private sendRequest(
    props: any,
    entities: Entity[],
    verbType: string = verbs.VERB_POST,
    queryParams: string
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
      if (queryParams !== null) {
        restURL += `?${queryParams}`;
      }
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
            resolve(this.responseText);
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
