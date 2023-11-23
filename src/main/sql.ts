export class SQL{
    static sqlite3 = require('sqlite3');
    static db : any
    static init():void{
        SQL.db = new SQL.sqlite3.Database('gallery.db');
        console.log("succ")
    }

    static initTable():void{
        SQL.db.serialize(() => {
            // 第一个操作
            SQL.db.run('CREATE TABLE users (id INT, name TEXT)');
        })
    }
}