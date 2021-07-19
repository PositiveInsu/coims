/**
 * Created by Joinsu on 2018-08-13.
 */
export class PageDto{

  constructor(page: number, size: number, sortList: Array<Sort>) {
    this.page = page;
    this.size = size;
    this.sortList = sortList;
  }

  private page: number;
  private size: number;
  private totalPage: number;
  private totalElement: number;
  private sortList: Array<Sort>;

  getPage(): number {
    return this.page;
  }

  setPage(value: number) {
    this.page = value;
  }

  getSize(): number {
    return this.size;
  }

  setSize(value: number) {
    this.size = value;
  }

  getTotalPage(): number {
    return this.totalPage;
  }

  setTotalPage(value: number) {
    this.totalPage = value;
  }

  getTotalElement(): number {
    return this.totalElement;
  }

  setTotalElement(value: number) {
    this.totalElement = value;
  }
}

export class Sort{

  private direction: string;
  private target: string;

  targetWithDESC( target: string): Sort{
    this.direction = "DESC";
    this.target = target;
    return this;
  }

  targetWithASC( target: string){
    this.direction = "ASC";
    this.target = target;
    return this;
  }

}
