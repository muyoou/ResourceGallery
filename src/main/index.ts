import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { MFile, MFolder, MFileSet } from './object'
import {SQL} from './sql'
const fs = require("fs");
const path = require("path");


//通过给出的地址打印文件树
async function openFile(_, files : string[]){
  let out = new MFileSet()
  console.log(files)
  files.forEach((file, index) =>{
    if (file) {
      let node = null as any
      node = TraverseFolder(file,''+index)
      out.pushFile(node)
      //fileTreeToList(node, out, -1, 0)
    }
  })
  return out
}

// 遍历文件并生成文件树
function TraverseFolder(folder, key: string): MFile|MFolder{
  let stats = fs.statSync(folder)
  if(stats.isDirectory()){
    let out = new MFolder(folder, path.basename(folder), key, [], stats.size, stats.birthtime, stats.mtime)
    let arr = fs.readdirSync(folder)
    arr.forEach((file, index) => {
      let fullPath = path.join(folder,file)
      out.pushFile(TraverseFolder(fullPath, key+'-'+index))
    });
    return out
  }else
    return new MFile(folder, path.basename(folder), key, path.extname(folder), stats.size, stats.birthtime, stats.mtime)
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', openFile)
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()
  SQL.init()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
