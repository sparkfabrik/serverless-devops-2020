export class Profile {

  id: string;
  status: string;
  firstName: string;
  lastName: string;
  bio?: string;
  role?: string;
  createdOn: number;

  constructor(source?: { [key: string]: string | number }) {
    if (source) {
      this.id = source.id as string;
      this.status = source.status as string;
      this.firstName = source.firstName as string;
      this.lastName = source.lastName as string;
      this.role = source.role as string;
      this.bio = source.bio as string;
      this.createdOn = source.createdOn as number;
    }
  }

}
