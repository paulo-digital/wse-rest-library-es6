import Settings from "../src/entities/app/helpers/Settings";
import { SettingsProperties } from "../types/Settings.d";

const baseSettings: SettingsProperties = {
  debug: false,
  host: "http://localhost:8087",
  apiVersion: "v3",
  serverInstance: "_defaultServer_",
  vhostInstance: "_defaultVHost_",
  username: "some-user",
  password: "some-password",
};

describe("Settings Class", () => {
  test("Should create settings properly", () => {
    const settings = new Settings(baseSettings);
    checkAllExpects(settings);
  });

  test("Should set properties properly", () => {
    const settings = new Settings();

    settings.setDebug(baseSettings.debug);
    settings.setHost(baseSettings.host);
    settings.setServerInstance(baseSettings.serverInstance);
    settings.setVhostInstance(baseSettings.vhostInstance);
    settings.setUsername(baseSettings.username);
    settings.setPassword(baseSettings.password);

    checkAllExpects(settings);
  });
});

function checkAllExpects(settings: Settings) {
  expect(settings.isDebug()).toBe(baseSettings.debug);
  expect(settings.getHost()).toBe(baseSettings.host);
  expect(settings.getServerInstance()).toBe(baseSettings.serverInstance);
  expect(settings.getVhostInstance()).toBe(baseSettings.vhostInstance);
  expect(settings.getUsername()).toBe(baseSettings.username);
  expect(settings.getPassword()).toBe(baseSettings.password);
  expect(settings.getApiVersion()).toBe(baseSettings.apiVersion);
}
