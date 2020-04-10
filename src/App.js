import { observer } from "mobx-react";
import * as React from "react";
import { dataList } from "./models/TodoStore";
import makeInspectable from 'mobx-devtools-mst';

const data = [{
  name: 'xxx',
  age: 123
}, {
  name: 'yyy',
  age: 123
}]

const store = dataList.create({ items: data, count: 123 });

makeInspectable(store);

const App = (props) => {
  return (
    <>
      <button onClick={()=>store.removeItem(store.items.length - 1)}>-</button>

      <button onClick={()=>store.addItem({ name: 'xyz', age1: 18 })}>+</button>
      {store.items.map(item => <div>{item.name}</div>)}
      {store.totalCount}
    </>
  )
}

export default observer(App);
