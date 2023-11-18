
// 文件类，表示单个文件
export class MFile {
    fullPath: string
    title: string
    key: string
    extname: string
    size: any
    birthtime: any
    mtime: any
    constructor(fullPath:string, title:string, key:string, extname?:string, size?:any, birthtime?:any, mtime?:any)
    constructor(file:MFile)

    constructor(v1:string|MFile, v2?:string, v3?:string, v4?:string, v5?:any, v6?:any, v7?:any){
        if(typeof v1 == 'string'){
            this.fullPath = v1
            this.title = v2 || ''
            this.key = v3 || ''
            this.extname = v4 || ''
            this.size = v5
            this.birthtime = v6
            this.mtime = v7
        }else{
            this.fullPath = v1.fullPath
            this.title = v1.title || ''
            this.key = v1.key || ''
            this.extname = v1.extname || ''
            this.size = v1.size
            this.birthtime = v1.birthtime
            this.mtime = v1.mtime
        }
    }
}

// 文件集合，表示多个文件或文件夹
export class MFileSet{
    children: Array<MFile|MFolder>
    constructor(children?:Array<MFile|MFolder>){
        this.children = children || []
    }

    // 初始化所有子文件
    initChildren():void{
        for(let index in this.children){
            if('children' in this.children[index]){
                let newFolder = new MFolder(this.children[index] as MFolder)
                newFolder.initChildren()
                this.children[index] = newFolder
            }else{
                this.children[index] = new MFile(this.children[index] as MFile)
            }
        }
    }

    // 添加子文件
    pushFile(file:MFile | MFolder):void {
        this.children.push(file)
    }

    // 根据Key搜索文件集合中的文件，包括文件夹内
    findFileByKey(key:string|string[]):MFile|MFolder{
        if(typeof key === "string"){
            key = key.split('-')
        }
        if(key.length == 1) return this.children[parseInt(key[0])]
        else{
            console.log(key)
            let folder = this.children[parseInt(key[0])]
            if(folder instanceof MFile) throw new Error("key值不正确")
            else return folder.findFileByKey(key.slice(1))
        }
    }

    // 设置子文件
    setChildren(children:Array<MFile|MFolder>):void{
        this.children = children
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
    constructor(fullPath:string, title:string, key:string, children?:Array<MFile|MFolder>, size?:any, birthtime?:any, mtime?:any)
    constructor(folder:MFolder)
    constructor(v1:string|MFolder, v2?:string, v3?:string, v4?:Array<MFile|MFolder>, v5?:any, v6?:any, v7?:any){
        if(typeof v1 == 'string'){
            super(v4)
            this.fullPath = v1
            this.title = v2 || ''
            this.key = v3 ||''
            this.size = v5
            this.birthtime = v6
            this.mtime = v7
        }else{
            super(v1.children)
            this.fullPath = v1.fullPath
            this.title = v1.title || ''
            this.key = v1.key ||''
            this.size = v1.size
            this.birthtime = v1.birthtime
            this.mtime = v1.mtime
        }
    }
}

