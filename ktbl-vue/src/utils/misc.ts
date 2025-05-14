// import pinyin from 'js-pinyin'
// import {deepClone} from './index'
import {LocationQueryValue} from "vue-router";

export function startWith(self, str:string) {
    var reg = new RegExp("^" + str);
    return reg.test(self);
}

export function endWith(self, str:string) {
    var reg = new RegExp(str + "$");
    return reg.test(self);
}

export function guid1() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
            var r = (Math.random() * 16) | 0
            var v = c == 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
        }
    )
}

export function guid() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
            var r = (Math.random() * 16) | 0
            var v = c == 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
        }
    )
}

export function uuid() {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'

    var uuid = s.join('')
    return uuid
}

export function unid() {
    const timestamp = new Date().getTime()
    return (
        Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36) +
        timestamp
    )
}

export function trim(str:string) {
    return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '');
}

export function emptyToStr(s) {
    if (s == null || s == undefined) return ''
}

export function usid() {
    const timestamp = new Date().getTime()
    return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(
        36
    )
}

export function rand3Num() {
    return Math.random().toString().substr(3, 3)
}

export function randLenNum(len) {
    return Math.random().toString().substr(3, len)
}

export function toCaptal(name:string) {
    return name.slice(0, 1).toUpperCase() + name.slice(1)
}

export function unCaptal(name:string) {
    return name.slice(0, 1).toLowerCase() + name.slice(1)
}

export function toCamel(str:string, flag) {
    if (!str) return str
    var arr = str.split('-')
    for (var i = 1; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1)
    }
    const ret = arr.join('')
    if (flag) {
        return toCaptal(ret)
    } else {
        return ret
    }
}

export function unCamel(str:string) {
    str = unCaptal(str)
    return str.replace(/([A-Z])/g, '-$1').toLowerCase().substr(0)
}

export function unUnderCamel(str:string) {
    str = unCaptal(str)
    return str.replace(/([A-Z])/g, '_$1').toLowerCase().substr(0)
}

export function removeUnder(str:string) {
    return str.replace('_', '').replace('-', '').toLowerCase().substr(0)
}

export function prop(prop, name, single) {
    if (prop) {
        if (single === true) return name
        else return name + '="' + prop + '"'
    } else {
        return ''
    }
}

export function arr2Map(arr, keyName, valueName) {
    const ret = {}
    arr = arr || []
    arr.forEach((item) => {
        const key = item[keyName]
        ret[key] = item[valueName]
    })
    return ret
}

// export function props(tag, component, arr) {
//   [':model', 'rule', '::step-strictly', ':model-->formModel']
//   if (prop) {
//     if (single === true) return name
//     else return name + '="' + prop + '"'
//   } else {
//     return ''
//   }
//
// }

// 下划线转换驼峰
export function toHump(name:string) {
    return name.replace(/\_(\w)/g, function (all, letter) {
        return letter.toUpperCase()
    })
}

export function arrToObjStr(arr) {
    if (!arr) return '{}'
    let str = '{'
    arr.forEach((data, i) => {
        if (i != 0) str = str + ','
        str = str + data
    })
    str = str + '}'
    return str
}

// 驼峰转换下划线
export function toLine(name:string) {
    if (!name) return ''
    return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}

export function findTreeNodetById(arrs, id) {
    if (!arrs) return null
    for (let i = 0; i < arrs.length; i++) {
        const item = arrs[i]
        if (item.id == id) {
            return item
        }
        const children = item.children
        if (!!children && Array.isArray(children) && children.length > 0) {
            const ret = findTreeNodetById(children, id)
            if (ret) return ret
        }
    }
    return null
}

export function pageDataIsExist(data) {
    // if (!data || !data.formConf || !data.formConf.formRef || !data.drawingList || data.drawingList.length < 1) {
    if (!data || !data.formConf || !data.drawingList) {
        return false
    }
    return true
}

export function getStyleVal(el, name) {
    const sty = el.currentStyle || window.getComputedStyle(el, null)
    let v
    if (sty[name].includes('%')) {
        v = sty[name].replace(/\%/g, '') / 100
    } else {
        v = sty[name].replace(/\px/g, '')
    }
    return v
}

export function getEvalStyleVal(el, name) {
    const sty = window.getComputedStyle(el, null)
    let v
    if (sty[name].includes('%')) {
        v = sty[name].replace(/\%/g, '') / 100
    } else {
        v = sty[name].replace(/\px/g, '')
    }
    return v
}

export function getRandomChineseWord() {
    var _rsl = ''
    var _randomUniCode = Math.floor(
        Math.random() * (40870 - 19968) + 19968
    ).toString(16)
    eval('_rsl=' + '"\\u' + _randomUniCode + '"')
    return _rsl
}

export function quote(v, type) {
    if (v == null) return 'null'
    if (type === 's') {
        return '\'' + v + '\''
    } else return v
}

export function randomChineseWord(len) {
    let ret = ''
    for (let i = 0; i < len; i++) {
        ret = ret + getRandomChineseWord()
    }
    return ret
}

// 忽略了其他代码，只写了如何调用
// 生成4-16位随机串
// randomWord(true, 4, 16)
// 生成24位的随机串
// randomWord(false, 24)
/**
 * 生成随机或者指定位数的英文数字组合
 * @param {boolean} randomFlag  是否是随机生成位数
 * @param {number} min      生成随机位数的最小数
 * @param {number} max      生成随机位数的最大数
 * @return {string}        返回生成的英文数字组合
 */
export function randomWord(randomFlag, min, max) {
    let str = ''
    let range = min // 默认赋值为第二个参数，如果是随机产生位数会通过下面的if改变。
    // '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    const arr = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
    ]
    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min
    }
    for (let i = 0; i < range; i++) {
        const index = Math.round(Math.random() * (arr.length - 1))
        str += arr[index]
    }
    return str
}

export function randomString(minNum:number, maxNum:number) {
    return randomWord(true, minNum, maxNum)
}

export function randomNumber(minNum:number, maxNum:number) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1)
            break
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum)
            break
        default:
            return 0
            break
    }
}

export function swapArrItem(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0]
    return arr
}

export function arrUp(arr, index) {
    if (arr.length > 1 && index !== 0) {
        const newArr = swapArrItem(arr, index, index - 1)
        return newArr
    }
}

export function arrDown(arr, index) {
    if (arr.length > 1 && index !== arr.length - 1) {
        const newArr = swapArrItem(arr, index, index + 1)
        return newArr
    }
}

const rnd = function (m, n) {
    return parseInt(Math.random() * (n - m) + m)
}

export function randomColor() {
    return 'rgb(' + rnd(0, 256) + ', ' + rnd(0, 256) + ', ' + rnd(0, 256) + ')'
}

export function getTreeIds(arr, level, index, idName, childrenName, ids) {
    // let ids = []
    if (index < level) {
        arr.forEach((node) => {
            getTreeIds(
                node[childrenName],
                level,
                index + 1,
                idName,
                childrenName,
                ids
            )
        })
    } else if (level == index) {
        arr.forEach((node) => {
            ids.push(node[idName])
        })
    }
    // return ids
}

export function calc(len) {
    let retLen = 0
    // alert(document.documentElement.clientWidth + ',' + document.documentElement.clientHeight)
    if (len.endsWith('vw')) {
        retLen =
            (parseInt(len.replace('vw', '')) / 100) *
            document.documentElement.clientWidth
    } else if (len.endsWith('vh')) {
        retLen =
            (parseInt(len.replace('vh', '')) / 100) *
            document.documentElement.clientHeight
    }
    console.log(retLen, 'retLen')
    return retLen
    // 1px = (100 / document.documentElement.clientWidth)vw
}

export function delLastComma(paramStr) {
    if (!paramStr) return paramStr
    paramStr = paramStr.trim()
    // console.log(paramStr, paramStr.charAt(paramStr.length - 1), 'paramStr')
    if (paramStr.length > 1 && paramStr.charAt(paramStr.length - 1) == ',') {
        paramStr = paramStr.substr(0, paramStr.length - 1)
    }
    return paramStr
}

// export function getFullPinyin(str) {
//   let name = pinyin.getFullChars(str)
//   return name
// }
export function arrContain(arr, val) {
    if (!arr || arr.length < 1) return false
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) return true
    }
    return false
}

export function arrDel(arrs, fn) {
    const rets = []
    arrs.forEach((arr, i) => {
        const v = fn(arr, i)
        if (v != undefined || v !== null) {
            rets.push(v)
        }
    })
    rets.forEach((ret, i) => {
        var index = arrs.indexOf(ret)
        if (index > -1) {
            arrs.splice(index, 1)
        }
    })

    return arrs
}

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getDotVal(val, dotName) {
    if (!dotName) return val
    const arr = dotName.split('.')
    arr.forEach((name) => {
        if (!name || !val) return
        val = val[name]
    })
    console.log(val, dotName, 'getDotVal')
    return val
}

//
// export function getFullPinyin(chinese, code) {
//
//   let name = unCaptal(pinyin.getFullChars(chinese))
//   if (!code) return name
//   if (code.indexOf(name) != -1) {
//     return code
//   } else return name
// }

export function deepCopy(object) {
    const resultObject = {}
    for (const obj in object) {
        if (typeof object[obj] === 'object' && !Array.isArray(object[obj])) {
            const x = {}
            x[obj] = deepCopy(object[obj])
            Object.assign(resultObject, x)
        } else {
            const x = {}
            x[obj] = object[obj]
            Object.assign(resultObject, x)
        }
    }
    return resultObject
}

export function copyDefaultVal(dest, src) {
    for (const key in src) {
        if (!dest.hasOwnProperty(key)) {
            dest[key] = deepClone(src[key])
        } else if (dest[key] == null || dest[key] == '' || dest[key] == undefined) {
            dest[key] = deepClone(src[key])
        } else {
            // 存在，是对象
            if (typeof src[key] === 'object' && !Array.isArray(src[key])) {
                copyDefaultVal(dest[key], src[key])
            } else {
                // 存在，不是对象
                dest[key] = deepClone(src[key])
            }
        }
    }
}

export const treeForEach = function (arr, childName, fn) {
    const name = childName || 'children'
    if (!!arr && Array.isArray(arr)) {
        (arr || []).forEach((node) => {
            if (!node) return
            fn(node, arr)
            let cnode = node[name];
            if (cnode && Array.isArray(cnode)) {
                treeForEach(cnode, childName, fn)
            }
        })
    }
}


export const treeForEachBack = function (arr, childName, fn) {
    const name = childName || 'children'
    if (Array.isArray(arr)) {
        arr.forEach((node) => {
            if (Array.isArray(node[name])) {
                treeForEach(node[name], childName, fn)
            }
            fn(node, arr)
        })
    }
}

export const objForEach = function (parent, obj, func) {
    if (obj == null) {
        return
    } else if (
        typeof obj === 'string' ||
        typeof obj === 'number' ||
        typeof obj === 'boolean'
    ) {
        return
    } else if (Array.isArray(obj)) {
        return obj.forEach((o) => {
            objForEach(obj, o, func)
        })
    } else if (typeof obj === 'object') {
        Object.keys(obj).forEach((key) => {
            const value = obj[key]
            func(parent, obj, key, value)
            if (
                typeof value === 'string' ||
                typeof value === 'number' ||
                typeof value === 'boolean'
            ) {
                return
            }
            if (Array.isArray(value) || typeof value === 'object') {
                objForEach(obj, value, func)
            }
        })
    }
}

export function arrDelOne(arr, item) {
    var index = arr.indexOf(item)
    if (index > -1) {
        arr.splice(index, 1)
    }
    return arr
}

export function arrGet(arr, keyName, keyValue) {
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        if (item[keyName] == keyValue) return item
    }
    return null
}

/**
 * 查找树形数据相匹配内容并返回
 **/
export function treeGet(nodes, keyName, keyValue, childName = 'children') {
    let itemObj = {}
    let loop = function (arr) {
        if (arr.length) {
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i]
                if (item[keyName] == keyValue) {
                    itemObj = item
                } else if (item[childName] && item[childName].length) {
                    loop(item[childName], keyName, keyValue)
                }
            }
        }
    }
    loop(nodes);
    return itemObj
}

/**
 * 校验只要是数字（包含正负整数，0以及正负浮点数）就返回true
 **/

export function isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/ // 非负浮点数
    var regNeg =
        /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
        return true
    } else {
        return false
    }
}

// export function convertFnParamTreeData(parent,fnParam) {
//   let arr = []
//   if(parent)
//
//   //  { name: ep, code: ep, dataType: 'Object', dataStruct: dataStruct }
//
// }
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach((keys) => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}

export function contains(string, substr, isIgnoreCase) {
    if (isIgnoreCase) {
        string = string.toLowerCase()
        substr = substr.toLowerCase()
    }
    if (substr && substr != '') {
        var startChar = substr.substring(0, 1)
        var strLen = substr.length

        for (var j = 0; j < string.length - strLen + 1; j++) {
            if (string.charAt(j) == startChar) { // 如果匹配起始字符,开始查找
                // 如果从j开始的字符与str匹配，那ok
                if (string.substring(j, j + strLen) == substr) return true
            }
        }
    }
    return false
}

export function getHiddenProp() {
    var prefixes = ['webkit', 'moz', 'ms', 'o'];

    // if 'hidden' is natively supported just return it
    if ('hidden' in document) return 'hidden';

    // otherwise loop over all the known prefixes until we find one
    for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'Hidden') in document)
            return prefixes[i] + 'Hidden';
    }

    // otherwise it's not supported
    return null;
}

export function getVisibilityState() {
    var prefixes = ['webkit', 'moz', 'ms', 'o'];
    if ('visibilityState' in document) return 'visibilityState';
    for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'VisibilityState') in document)
            return prefixes[i] + 'VisibilityState';
    }
    // otherwise it's not supported
    return null;
}

export function isHidden() {
    var prop = getHiddenProp();
    if (!prop) return false;

    return document[prop];
}

export function structureOrgList(orgList) {
    let tempList = []
    orgList.forEach(item => {
        let tempObj = deepClone(item)

        if (item.children && item.children.length > 0) {
            delete tempObj.children
            let subList = structureOrgList(item.children)
            tempList.push(...subList)
        }

        tempList.push(tempObj)
    })

    return tempList
}

var I64BIT_TABLE =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');

function hash(input) {
    var hash = 5381;
    var i = input.length - 1;
    if (typeof input == 'string') {
        for (; i > -1; i--)
            hash += (hash << 5) + input.charCodeAt(i);
    } else {
        for (; i > -1; i--)
            hash += (hash << 5) + input[i];
    }
    var value = hash & 0x7FFFFFFF;
    var retValue = '';
    do {
        retValue += I64BIT_TABLE[value & 0x3F];
    }
    while (value >>= 6);
    return retValue;
}

// 处理数组类型的路由参数
function getRouteParam(param: LocationQueryValue | LocationQueryValue[]) {
    return Array.isArray(param) ? param[0] : param
}

export const MiscUtils = {
    // getFullPinyin,
    delLastComma,
    calc,
    getTreeIds,
    randomColor,
    arrContain,
    uuid,
    unid,
    arr2Map,
    arrDelOne,
    arrGet,
    treeForEach,
    contains,
    randomNumber,
    structureOrgList,
    guid,
    getRouteParam,
    hash,
}
