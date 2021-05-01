export interface ILanguage {
  name: string;
  code: string;
  flag: string;
  isPublished: boolean;
  displayOrder: number;
}

export interface ITranslation {
  languageCode: string; // e.g en
  key: string;
  value: string;
}
