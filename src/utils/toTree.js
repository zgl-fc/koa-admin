module.exports = function toTree(arr, pid) {
  const len = arr.length
  const rec = (pid) => {
    let res = []
    for (let i = 0; i < len; i++) {
      const item = arr[i]
      if (item.pid === pid) {
        item.children = rec(item.id)
        res.push(item)
      }
    }
    return res
  }
  return rec(pid)
}