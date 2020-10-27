// Types
import { RequestProperties } from "../types/RequestProperties.d";
// Classes
import Settings from "./entities/app/helpers/Settings";
import Wowza, { methods } from "./Wowza";

class StreamTarget extends Wowza {
  private appName: string;
  private props: RequestProperties = {
    sourceStreamName: "myStream",
    entryName: "ppsource",
    profile: "rtmp",
    host: "localhost",
    userName: null,
    password: null,
    streamName: "myStream",
    application: "live",
    port: 1935,
    restURI: null,
  };

  public constructor(settings: Settings, appName: string) {
    super(settings);
    this.appName = appName;
  }

  public create(props: RequestProperties) {
    this.updateProps(props);
    return this.sendRequest(this.props, [], methods.POST);
  }

  public update(props: RequestProperties) {
    this.updateProps(props);
    return this.sendRequest(this.props, [], methods.PUT);
  }

  public getAll() {
    this.setNoParams();
    this.props.restURI = this.getRestURI();

    return this.sendRequest(this.props, [], methods.GET);
  }

  public remove(entryName: string) {
    this.setNoParams();
    this.props.restURI = `${this.getRestURI()}/${entryName}`;

    return this.sendRequest(this.props, [], methods.DELETE);
  }

  // Private methods. /////// ////////

  private setNoParams() {
    this.props = {
      ...this.props,
      sourceStreamName: null,
      entryName: null,
      profile: null,
      host: null,
      userName: null,
      password: null,
      streamName: null,
      application: null,
    };
  }

  private updateProps(props: RequestProperties) {
    const { entryName } = props;

    this.props = { ...this.props, ...props };
    this.props.restURI = `${this.getRestURI()}/${entryName}`;
  }

  getRestURI() {
    return `${this.getHost()}/servers/${this.getServerInstance()}/applications/${
      this.appName
    }/pushpublish/mapentries`;
  }
}
