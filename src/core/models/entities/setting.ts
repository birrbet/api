export class SEO {
  defaultPageTitle: string;
  defaultMetaDescription: string;
  homePageTitle: string;
  homePageMetaDescription: string;
}
export class Currency {
  name: string;
  code: string;
}
export interface IGeneralSetting {
  appId: string;
  name: string;
  logo: string;
  favicon: string;
  themeName: string;
  socialLinks: string[];
  defaultCurrency: string;
  currencies: Currency[];
  searchEngineOpt: SEO;
}
export interface ITaxSetting {
  vat: number; // in percent, so it should be between 0 and 1
  incomeTax: number; // in percent, so it should be between 0 and 1
  customerPaysIncomeTax: boolean;
  customerPaysIncomeTaxWins: number; //customer pays if he wins >= [some amount (default 0)]
}
export interface IPromotions {
  title: string;
  sub_title: string;
  location: string;
}
