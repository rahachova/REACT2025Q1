export interface IMovie {
  title: string;
  usReleaseDate: string;
  mainDirector: {
    uid: string;
    name: string;
  };
  uid: string;
}
