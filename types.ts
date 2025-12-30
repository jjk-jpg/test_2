
export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface SiteSettings {
  heroHeadline: string;
  heroSubheadline: string;
  accentColor: string;
}

export enum ViewMode {
  HOME = 'home',
  ADMIN = 'admin'
}
