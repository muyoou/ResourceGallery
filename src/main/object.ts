// 文件类，表示单个文件
export class MFile {
    fullPath: string
    title: string
    key: string
    extname: string
    size: any
    birthtime: any
    mtime: any
    constructor(fullPath:string, title:string, key:string, extname?:string, size?:any, birthtime?:any, mtime?:any){
        this.fullPath = fullPath
        this.title = title
        this.key = key
        this.extname = extname || ''
        this.size = size
        this.birthtime = birthtime
        this.mtime = mtime
    }
}

// 文件集合，表示多个文件或文件夹
export class MFileSet{
    children: Array<MFile|MFolder>
    constructor(children?:Array<MFile|MFolder>){
        this.children = children || []
    }

    // 添加在文件夹内的文件
    pushFile(file:MFile | MFolder):void {
        this.children.push(file)
    }

}

//文件夹类，表示一个文件夹
export class MFolder extends MFileSet{
    fullPath: string
    title: string
    key: string
    size: any
    birthtime: any
    mtime: any
    constructor(fullPath:string, title:string, key:string, children?:Array<MFile|MFolder>, size?:any, birthtime?:any, mtime?:any){
        super(children)
        this.fullPath = fullPath
        this.title = title
        this.key = key
        this.children = children || []
        this.size = size
        this.birthtime = birthtime
        this.mtime = mtime
    }
}

