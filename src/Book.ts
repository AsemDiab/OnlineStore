/*
Book class is class for storing information of book in one object that is only purpose
*/

export class Book {
  private static booksCount = 0;
  private copyID: number;
  private title: string;
  private author: string;
  private isbn: string;
  private _isBorrowed: boolean = false;

  constructor(title: string, author: string, isbn: string) {
    this.author = author;
    this.title = title;
    this.isbn = isbn;
    this.copyID = Book.booksCount++;
  }

  get _title(): string {
    return this.title;
  }
  get _author(): string {
    return this.author;
  }
  get _isbn(): string {
    return this.isbn;
  }
  get _copyId(): number {
    return this.copyID;
  }
  get isBorrowed(): boolean {
    return this._isBorrowed;
  }
  set isBorrowed(newValue) {
    this._isBorrowed = newValue;
  }
}
