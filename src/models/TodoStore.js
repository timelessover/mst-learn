import { types, onSnapshot,flow } from 'mobx-state-tree'
import { autorun } from 'mobx'
import makeInspectable from 'mobx-devtools-mst';


// 类型机制，天然支持TypeScript
const dataItem = types.model({
  name: types.string,
  age: types.number,

})

// flow 只能接收一个promise对象

const call = () =>{
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      resolve(5)
    }, 5000);    
  })
} 

// 链式调用，store配置更加清晰

const dataList = types.model({
  items: types.optional(types.array(dataItem), []),
  count: types.number,
  state: types.enumeration("State", ["pending", "done", "error"])
}).actions(self => ({
  addItem(item) {
    self.items.push(item)
  },
  removeItem(index) {
    self.items.splice(index,1)
  },
  addCount() {
    self.count++
  },
  dereaseCount() {
    self.count--
  },
  fetchProjects: flow(function* () { // <- note the star, this a generator function!
    self.state = "pending"
    try {
      // ... yield can be used in async/await style
      self.count = yield call()
      self.state = "done"
    } catch (error) {
      // ... including try/catch error handling
      console.error("Failed to fetch projects", error)
      self.state = "error"
    }
  })
})).views(self => ({
    get totalCount() {
        return self.count * 2
    },
}))

const data = [{
  name: 'xxx',
  age: 123
}, {
  name: 'yyy',
  age: 123
}]
// 在项目中可以使用react.context来进行状态管理传递
export const store = dataList.create({ items: data, count: 123, state:'done' });

// 自动依赖收集，数据改动后调用回调
autorun(() => {
  console.log(store.count)
})

onSnapshot(store, snapshot => {
  console.log(snapshot)
})

// 时间旅行，可以更细粒度的跟踪组件状态
makeInspectable(store);
