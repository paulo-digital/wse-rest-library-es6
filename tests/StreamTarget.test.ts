import mockAxios from "jest-mock-axios";
import Settings from "../src/entities/app/helpers/Settings";
import StreamTarget from "../src/StreamTarget";

const settings = new Settings({
  debug: false,
  host: "http://localhost:8087",
  serverInstance: "_defaultServer_",
  vhostInstance: "_defaultVHost_",
  username: "some-user",
  password: "some-password",
});

describe("StreamTarget Class", () => {
  const stream = new StreamTarget(settings);

  test("Should initialize the class", () => {
    expect(stream).not.toBeNull();
    expect(stream.settings).toBe(settings);
  });

  test("Should send an CREATE request (mocked)", () => {
    // https://www.wowza.com/docs/live-sources-query-examples#createpublisher
    const result = stream.create({
      password: "123",
      name: "myRTMPencoder",
      serverName: "",
      description: "",
      version: "3",
    });

    const serverResponse = {
      success: true,
      message: "",
      data: null,
    };

    mockAxios.mockResponse(serverResponse);

    expect(result).resolves.not.toBeNull();
    result.then((response: any) => {
      expect(response.code).toBe(200);
      expect(response.data).toBe(serverResponse);
    });
  });

  test("Should send an UPDATE request (mocked)", () => {
    const result = stream.update({
      password: "123",
      name: "myRTMPencoder",
      serverName: "",
      description: "",
      version: "3",
    });

    const serverResponse = {
      success: true,
      message: "",
      data: null,
    };

    mockAxios.mockResponse(serverResponse);

    expect(result).resolves.not.toBeNull();
    result.then((response: any) => {
      expect(response.code).toBe(200);
      expect(response.data).toBe(serverResponse);
    });
  });

  test("Should fail an DELETE request without stream name (mocked)", () => {
    // @ts-ignore
    const result = stream.remove();
    expect(result).rejects.not.toBeNull();
  });

  test("Should send an DELETE request (mocked)", () => {
    // https://www.wowza.com/docs/live-sources-query-examples#removepublisher
    const result = stream.remove("myRTMPencoder");
    mockAxios.mockResponse({ status: 200, data: null });

    expect(result).resolves.not.toBeNull();
  });

  test("Should send an GET request for a list of live streams (mocked)", () => {
    // https://www.wowza.com/docs/live-sources-query-examples#getpublishers
    const result = stream.getAll();
    const serverResponse = {
      serverName: "_defaultServer_",
      publishers: [
        {
          publisher: "myRTSPcamera",
        },
      ],
    };
    mockAxios.mockResponse({ status: 200, data: serverResponse });

    expect(result).resolves.not.toBeNull();
    result.then((response: any) => {
      expect(response.code).toBe(200);
      expect(response.data).toBe(serverResponse);
    });
  });
});
