export interface IMovie {
  uid: string;
  title: string;
  usReleaseDate: string;
  mainDirector: {
    uid: string;
    name: string;
  };
  writers: IWriter[];
}

interface IWriter {
  uid: string;
  name: string;
}
