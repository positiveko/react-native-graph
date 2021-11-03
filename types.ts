export interface CoinItem {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}

export interface PriceItem {
  price: number;
  timestamp: number;
}

export interface CoinInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: {
    explorer: string[];
    facebook: string[];
    reddit: string[];
    website: string[];
    youtube: string[];
    source_code: string[];
  };
  links_extended: {
    type: string;
    url: string;
  }[];
  whitepaper: {
    link: string;
    thumbnail: string;
  };
  first_data_at: string;
  last_data_at: string;
}
