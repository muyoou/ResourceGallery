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

    // 根据Key搜索文件集合中的文件，包括文件夹内
    findFileByKey(key:string):MFile|MFolder{
        let level = this.children[0].key.split('-')
        let searchLevel = key.split('-')
        if(level.length > 1) searchLevel.splice(0,level.length-1)
        let target:MFile|MFolder  = this.children[searchLevel[0]]
        searchLevel.splice(0,1)
        searchLevel.forEach(item =>{
            if(target instanceof MFileSet) target = target.children[parseInt(item)]
            else throw new Error("用于查询的key值错误");
        })
        return target
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

