// Types
import { RequestPayload } from "../types/RequestPayload";
// Classes
import Settings from "./entities/app/helpers/Settings";
import Wowza, { methods } from "./Wowza";

class StreamTarget extends Wowza {
  public constructor(settings: Settings) {
    super(settings);
  }

  /**
   * Create a live stream source (publisher) for a local
   * instance of Wowza Streaming Engine.
   * @param props
   */
  public create(props: RequestPayload) {
    return this.sendRequest(this.getRestUri(), props, [], methods.POST);
  }

  public update(props: RequestPayload) {
    return this.sendRequest(this.getRestUri(), props, [], methods.PUT);
  }

  /**
   * Get a list of live stream sources
   * from the of Wowza Streaming Engine.
   */
  public getAll() {
    return this.sendRequest(this.getRestUri(), {}, [], methods.GET);
  }

  /**
   * Delete a live stream source
   * from the of Wowza Streaming Engine.
   * @param entryName The stream name
   */
  public remove(entryName: string) {
    if (!entryName)
      return Promise.reject(Error("Must inform an live stream to remove"));

    return this.sendRequest(
      `${this.getRestUri()}/${entryName}`,
      {},
      [],
      methods.DELETE
    );
  }

  /**
   * Format the Url to query the Wowza Streaming Engine.
   */
  getRestUri() {
    return `${this.getHost()}/${this.settings.getApiVersion()}/servers/${this.getServerInstance()}/publishers`;
  }
}

export default StreamTarget;
