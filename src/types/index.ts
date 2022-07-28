export interface IGetWallPapersResponse {
  total: number;
  totalHits: number;
  hits: IWallPaer[];
}

export interface IWallPaer {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  collections: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

export type Orientation = "all" | "horizontal" | "vertical";
export type Order = "popular" | "latest";

export interface IParamObj {
  q: string;
  orientation: Orientation;
  order: Order;
  page: string;
  per_page: string;
}
