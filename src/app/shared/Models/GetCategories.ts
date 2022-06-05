export interface GetCategories {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  imagePath: string;
  servicesAvgTime: number;
  parentId: number;
  parentTitle: string;
  parentTitleAr: string
  creationDate: Date;
  order:number;
}
