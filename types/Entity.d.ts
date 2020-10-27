export interface Entity {
  restURI: string;
  getEntityName(): string;
  setURI(baseURI: string): void;
}
