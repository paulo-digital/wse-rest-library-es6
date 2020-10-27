import Settings from "./entities/app/helpers/settings";
import { RequestProperties } from "../types/RequestProperties";
import Wowza, { methods } from "./wowza";

class StreamTarget extends Wowza {
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

  private appName: string;

  public constructor(settings: Settings, appName: string) {
    super(settings);
    this.appName = appName;
  }

  public create(createProps: RequestProperties) {
    const { entryName } = createProps;

    this.props = { ...this.props, ...createProps };
    this.props.restURI = `${this.getRestURI()}/${entryName}`;

    return this.sendRequest(this.props, [], methods.POST);
  }

  getRestURI() {
    return `${this.getHost()}/servers/${this.getServerInstance()}/applications/${
      this.appName
    }/pushpublish/mapentries`;
  }
}
