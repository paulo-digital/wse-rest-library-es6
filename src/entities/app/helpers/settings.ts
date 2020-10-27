import { SettingsProperties } from "../../../../types/Settings.d";

class Settings {
  private debug: boolean;
  private host: string;
  private serverInstance: string;
  private vhostInstance: string;
  private username: string;
  private password: string;
  private useDigest: boolean;

  constructor(settings?: SettingsProperties) {
    if (settings) {
      this.debug = settings.debug;
      this.host = settings.host;
      this.serverInstance = settings.serverInstance;
      this.vhostInstance = settings.vhostInstance;
      this.username = settings.username;
      this.password = settings.password;
      this.useDigest = settings.useDigest;
    }
  }

  /**
   * Get Debug.
   *
   * @return bool
   */
  public isDebug() {
    return this.debug;
  }

  /**
   * Set Debug.
   *
   * @param bool debug
   *
   * @return Settings
   */
  public setDebug(debug: boolean) {
    this.debug = debug;
    return this;
  }

  /**
   * Get Host.
   *
   * @return string
   */
  public getHost() {
    return this.host;
  }

  /**
   * Set Host.
   *
   * @param string host
   *
   * @return settings
   */
  public setHost(host: string) {
    this.host = host;

    return this;
  }

  /**
   * Get ServerInstance.
   *
   * @return string
   */
  public getServerInstance() {
    return this.serverInstance;
  }

  /**
   * Set ServerInstance.
   *
   * @param string serverInstance
   *
   * @return settings
   */
  public setServerInstance(serverInstance: string) {
    this.serverInstance = serverInstance;

    return this;
  }

  /**
   * Get VhostInstance.
   *
   * @return string
   */
  public getVhostInstance() {
    return this.vhostInstance;
  }

  /**
   * Set VhostInstance.
   *
   * @param string vhostInstance
   *
   * @return settings
   */
  public setVhostInstance(vhostInstance: string) {
    this.vhostInstance = vhostInstance;

    return this;
  }

  /**
   * Get Username.
   *
   * @return string
   */
  getUsername() {
    return this.username;
  }

  /**
   * Set Username.
   *
   * @param string username
   *
   * @return settings
   */
  public setUsername(username: string) {
    this.username = username;

    return this;
  }

  /**
   * Get Password.
   *
   * @return string
   */
  public getPassword() {
    return this.password;
  }

  /**
   * Set Password.
   *
   * @param string password
   *
   * @return settings
   */
  public setPassword(password: string) {
    this.password = password;

    return this;
  }

  /**
   * Get UseDigest.
   *
   * @return bool
   */
  public isUseDigest() {
    return this.useDigest;
  }

  /**
   * Set UseDigest.
   *
   * @param bool useDigest
   *
   * @return Settings
   */
  public setUseDigest(useDigest: boolean) {
    this.useDigest = useDigest;

    return this;
  }
}

export default Settings;
