export enum Group {
  YEAR = "year",
  GENRE = "genre",
}

export type Filter = {
  name: string;
  group: Group;
  fnc: Function;
};
