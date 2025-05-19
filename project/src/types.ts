export interface GameSection {
  image: string;
  Text1: string;
  Text1_Command?: string;
  Text1_Happening?: string;
  Type?: string;
  Duration?: number;
  Version?: string;
  Text?: {
    Text1: string;
    Text1_Happening?: string;
  };
}

export interface GameData {
  Sections: {
    [key: string]: GameSection;
  };
}

export interface MarketplaceItem {
  rating: number;
  title: string;
  description: string;
  image: string;
  link: string;
}