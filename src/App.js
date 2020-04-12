import { observer } from "mobx-react";
import * as React from "react";
import { store } from "./models/TodoStore";






const App = (props) => {
  return (
    <>
      {store.state === 'pending' ? 'loading...': '加载成功'}
      <button onClick={()=>store.dereaseCount()}>-</button>
      <button onClick={()=>store.fetchProjects()}>+</button>
      {store.items.map(item => <div>{item.name}</div>)}
      {store.count}
    </>
  )
}

export default observer(App);
