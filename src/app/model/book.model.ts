export class Book {
    id: number | undefined;
    title: string = "";
    description: string = "";
    author: string = "";
    price: number = 0.0;
    createTime: Date = new Date;

    constructor(id?: number, title: string = "", price: number = 0) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
}