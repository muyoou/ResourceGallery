// 文件单元类，文件和文件夹的超类
class FileUnit{
    fullPath: string
    title: string
    key: string
    birthtime: any
    mtime: any
    resource!: Unit
    constructor(fullPath:string, title:string, key:string, birthtime?:any, mtime?:any)
    constructor(file:FileUnit)
    constructor(v1:string|FileUnit, v2?:string, v3?:string, v4?:any, v5?:any){
        if(typeof v1 ==='string'){
            this.fullPath = v1
            this.title = v2 || ''
            this.key = v3 || ''
            this.birthtime = v4 || ''
            this.mtime = v5 || ''
        }else{
            this.fullPath = v1.fullPath
            this.title = v1.title || ''
            this.key = v1.key || ''
            this.birthtime = v1.birthtime || ''
            this.mtime = v1.mtime || ''
        }
    }

    // 设置为新资源
    setNewUnit(name: string, type: string):Unit{
        this.resource = new Unit(name, type, this.constructor.name , this)
        return this.resource
    }

    // 获取格式化的创建时间
    getBirthtime():string{
        let date = new Date(this.birthtime)
        let formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        return formattedDate
    }

    // 获取格式化的修改时间
    getMtime():string{
        let date = new Date(this.mtime)
        let formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        return formattedDate
    }

}

// 文件类，表示单个文件
export class MFile extends FileUnit{
    extname: string
    size: any
    type:string
    constructor(fullPath:string, title:string, key:string, extname?:string, size?:any, birthtime?:any, mtime?:any)
    constructor(file:MFile)

    constructor(v1:string|MFile, v2?:string, v3?:string, v4?:string, v5?:any, v6?:any, v7?:any){
        if(typeof v1 == 'string'){
            super(v1, v2 as string, v3 as string, v6, v7)
            this.extname = v4 || ''
            this.size = v5
        }else{
            super(v1)
            this.extname = v1.extname || ''
            this.size = v1.size
        }
        this.type = this.getFileType()
    }

    // 获取文件格式
    getFileType():string{
        if(['png','jpg','gif'].includes(this.extname)) return 'image'
        return 'unknown'
    }

}


//文件夹类，表示一个文件夹
export class MFolder extends FileUnit{
    children: Array<MFile|MFolder>
    constructor(fullPath:string, title:string, key:string, children?:Array<MFile|MFolder>, birthtime?:any, mtime?:any)
    constructor(folder:MFolder)
    constructor(v1:string|MFolder, v2?:string, v3?:string, v4?:Array<MFile|MFolder>, v6?:any, v7?:any){
        if(typeof v1 == 'string'){
            super(v1, v2 as string, v3 as string, v6, v7)
            this.children = v4 || []
        }else{
            super(v1)
            this.children = v1.children || []
        }
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
}

// 文件集合，表示多个文件或文件夹
export class MFileSet extends MFolder{
    constructor(children?:Array<MFile|MFolder>){
        super('','','',children || [])
    }

    // 添加子文件
    pushFile(file:MFile | MFolder):void {
        this.children.push(file)
    }

    // 设置子文件
    setChildren(children:Array<MFile|MFolder>):void{
        this.children = children
    }
}

// 每一个资源的基类
export class Unit{
    type: string
    name: string
    carrierType: string
    carrier: FileUnit
    constructor(name: string, type: string, carrierType: string, carrier:FileUnit){
        this.name = name
        this.type = type
        this.carrierType = carrierType
        this.carrier = carrier
    }
}