/**
 * Created by Joinsu on 2018-07-31.
 */
export class Role{
  private id: number;
  private role: string;

  constructor( id: number, role: string){
    this.id = id;
    this.role = role;
  }
  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  getRole(): string {
    return this.role;
  }

  setRole(value: string) {
    this.role = value;
  }
}
