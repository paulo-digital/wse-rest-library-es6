import { SettingsProperties } from "../../../../types/Settings.d";

class Settings {
  private settings: SettingsProperties = {
    debug: false,
    host: "http://localhost:8087/v2",
    serverInstance: "_defaultServer_",
    vhostInstance: "_defaultVHost_",
    username: "",
    password: "",
    useDigest: true,
  };

  constructor(settings?: SettingsProperties) {
    if (settings) {
      this.settings = { ...this.settings, ...settings };
    }
  }

  /**
   * Get Debug.
   *
   * @return bool
   */
  public isDebug() {
    return this.settings.debug;
  }

  /**
   * Set Debug.
   *
   * @param bool debug
   *
   * @return Settings
   */
  public setDebug(debug: boolean) {
    this.settings.debug = debug;
    return this;
  }

  /**
   * Get Host.
   *
   * @return string
   */
  public getHost() {
    return this.settings.host;
  }

  /**
   * Set Host.
   *
   * @param string host
   *
   * @return settings
   */
  public setHost(host: string) {
    this.settings.host = host;

    return this;
  }

  /**
   * Get ServerInstance.
   *
   * @return string
   */
  public getServerInstance() {
    return this.settings.serverInstance;
  }

  /**
   * Set ServerInstance.
   *
   * @param string serverInstance
   *
   * @return settings
   */
  public setServerInstance(serverInstance: string) {
    this.settings.serverInstance = serverInstance;

    return this;
  }

  /**
   * Get VhostInstance.
   *
   * @return string
   */
  public getVhostInstance() {
    return this.settings.vhostInstance;
  }

  /**
   * Set VhostInstance.
   *
   * @param string vhostInstance
   *
   * @return settings
   */
  public setVhostInstance(vhostInstance: string) {
    this.settings.vhostInstance = vhostInstance;

    return this;
  }

  /**
   * Get Username.
   *
   * @return string
   */
  getUsername() {
    return this.settings.username;
  }

  /**
   * Set Username.
   *
   * @param string username
   *
   * @return settings
   */
  public setUsername(username: string) {
    this.settings.username = username;

    return this;
  }

  /**
   * Get Password.
   *
   * @return string
   */
  public getPassword() {
    return this.settings.password;
  }

  /**
   * Set Password.
   *
   * @param string password
   *
   * @return settings
   */
  public setPassword(password: string) {
    this.settings.password = password;

    return this;
  }

  /**
   * Get UseDigest.
   *
   * @return bool
   */
  public isUseDigest() {
    return this.settings.useDigest;
  }

  /**
   * Set UseDigest.
   *
   * @param bool useDigest
   *
   * @return Settings
   */
  public setUseDigest(useDigest: boolean) {
    this.settings.useDigest = useDigest;

    return this;
  }
}

export default Settings;
