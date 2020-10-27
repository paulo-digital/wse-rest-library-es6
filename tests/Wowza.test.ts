import mockAxios from "jest-mock-axios";
import Settings from "../src/entities/app/helpers/Settings";
import Wowza, { methods } from "../src/wowza";

const settings = new Settings({
  debug: true,
  host: "http://localhost",
  serverInstance: "_defaultServer_",
  vhostInstance: "_defaultVHost_",
  username: "some-user",
  password: "some-password",
  useDigest: true,
});

const requestProps = {
  sourceStreamName: "myStream",
  entryName: "ppsource",
  profile: "rtmp",
  host: "localhost",
  userName: null,
  password: null,
  streamName: "myStream",
  application: "live",
  port: 1935,
  restURI: settings.getHost(),
};

describe("Wowza Base Class", () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
  });

  test("Should initialize the class", () => {
    const wowza = new Wowza(settings);

    expect(wowza).not.toBeNull();
    expect(wowza.settings).toBe(settings);
  });

  test("Should fail when try to SEND send with missing props", () => {
    const wowza = new Wowza(settings);
    const result = wowza.sendRequest(null, []);
    expect(result).rejects.not.toBeNull();
  });

  test("Should get settings props", () => {
    const wowza = new Wowza(settings);
    expect(wowza.getHost()).toBe(settings.getHost());
    expect(wowza.getServerInstance()).toBe(settings.getServerInstance());
    expect(wowza.getVHostInstance()).toBe(settings.getVhostInstance());
  });

  test("Should send an request (mocked)", () => {
    const wowza = new Wowza(settings);
    const result = wowza.sendRequest(requestProps, [], methods.POST);

    mockAxios.mockResponse({ data: requestProps });

    expect(result).resolves.not.toBeNull();
    result.then((response: any) => {
      expect(response.code).toBe(200);
      expect(response.data).toBe({ data: requestProps });
    });
  });
});
