import createScript from './createScript'

namespace xlsxOptions {
  export interface item {
    [x: string]: string
  }

  export interface options {
    name: string
    data: item[]
    header: item
    skipHeader: boolean
  }

  export interface fileEveTarget extends EventTarget {
    result?: ArrayBuffer
  }
}

let load: Promise<string | Error>

// 动态加载xlsx插件
async function loadXLSX() {
  if (load) return load
  const xlsxDownloadURL = 'https://cdn.bootcdn.net/ajax/libs/xlsx/0.16.5/xlsx.full.min.js'
  load = createScript(xlsxDownloadURL)
  return load
}

// 设置自动宽度
function autoWidth(ws: any, data: xlsxOptions.item[]) {
  if (!data.length) return []
  // 中文两个字符宽度2，英文宽度1
  const colWidth = data.map((item) => {
    return Object.values(item).map((val) => {
      const mach = !val ? 10 : val.toString().length * (val.toString().charCodeAt(0) > 255 ? 2 : 1)
      return {
        wch: Math.max(10, mach + 2),
      }
    })
  })
  let cols = colWidth[0]
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (cols[j]['wch'] < colWidth[i][j]['wch']) {
        cols[j]['wch'] = colWidth[i][j]['wch']
      }
    }
  }
  ws['!cols'] = cols
}

/**
 * json导出excel
 * @param name：文件名字，string
 * @param data： 内容： array
 * @param header： 标题： Object{key: 对应名字}
 * @param skipHeader: 是否隐藏头部
 */
export const JSONToExcel = async (options: xlsxOptions.options) => {
  await loadXLSX()
  const { name = 'excel', data = [], header = {}, skipHeader = true } = options
  const cloneData = [...data]
  cloneData.unshift(header)
  const ws = XLSX.utils.json_to_sheet(cloneData, {
    header: Object.keys(header),
    skipHeader,
  })
  // 设置自动宽度
  autoWidth(ws, cloneData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
  /* generate file and send to client */
  XLSX.writeFile(wb, `${name}.xlsx`)
}

export const excelToJSON = async (file: File) => {
  if (!file) return
  await loadXLSX()
  const suffix = file.name.split('.')[1]
  if (suffix !== 'xls' && suffix !== 'xlsx') {
    alert('导入的文件格式不正确!')
    return
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function (e) {
      if (!e.target) return reject('event target undefined')
      const t = e.target as xlsxOptions.fileEveTarget
      const wb = XLSX.read(t.result, {
        type: 'binary',
      })
      resolve(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]))
    }
    reader.readAsBinaryString(file)
  })
}
