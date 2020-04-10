import { types } from 'mobx-state-tree'



const dataItem = types.model({
  name: types.string,
  age: types.number,
})

export const dataList = types.model({
  items: types.optional(types.array(dataItem), []),
  count: types.number
}).actions(self => ({
  addItem(item) {
    self.items.push(item)
  },
  removeItem(index) {
    self.items.splice(index,1)
  }
})).views(self => ({
    get totalCount() {
        return self.count * 2
    },
}))