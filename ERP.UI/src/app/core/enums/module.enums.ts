export enum StatusType {
  Project = 1,
  Attachment,
  Drawing,
  Submittal,
  Production
}
export enum Validation {
  Required = 1,
  MaxLength,
}
export enum NoteType {
  Project = 1,
  Item,
  Shipment
}
export enum Category {
  Note = 1,
  ProductionStatus,
  Projects,
  Specifications,
  Submittals,
  ProjectItems
}
export enum CategoryType {
  Finishes = 1,
  COM,
  Drawings,
  Hardware,
  Production
}
export enum FileType {
  image = 1,
  pdf,
  word,
  excel,
  ppt,
  other
}
export enum FilterBy {
  Contain = 1,
  Equal
}
export enum SubmittalTransactionType {
  Finishes = 1,
  Hardwares,
  ShopDrawing
}
export enum ShipmentMethods {
  Air = 1,
  Container = 2,
  Domestic = 3
}
export enum QuantityType {
  COM = "COM",
  COL = "COL",
  Other = "Other"
}
