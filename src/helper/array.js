module.exports = {
  howManyInArray: (sourceArr, arr) => {
    return arr.filter(v => sourceArr.includes(v)).length
  },
  mergeArrayWithoutDuplicate: (targetArr, arr) => {
    targetArr.push.apply(targetArr, arr.filter((v) => targetArr.indexOf(v) < 0))
  },
  removeMultipleFromArray: (targetArr, arr) => {
    arr.forEach((v) => {
      const index = targetArr.indexOf(v)
      
      if (index > -1) {
        targetArr.splice(index, 1)
      }
    })
  }
}