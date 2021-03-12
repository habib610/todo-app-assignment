import { useReducer, useRef } from "react";
import "./App.css";
import { REMOVE, INCREMENT, REDO, UNDO } from "./Constant";

function App() {
  const inputValue = useRef(0);

  const initialState = {
    present : [], 
    past: [],
    future: []
  }
  const reducer = (state = {present: [], past:[], future: []}, action) => {
    switch(action.type) {
      case INCREMENT:
        inputValue.current.value = ''
        if(inputValue.current.value === '') {
          alert("Input Field Can't be Empty") 
          return state
        }
        const existingItem = state.present.find(num=> num === action.payload)
        if(existingItem) {
          alert("Item Exist")
          return state
        } 
        else{
          return {
            ...state, present: [...state.present, action.payload]
          }
        }
        

      case REMOVE:
        inputValue.current.value = ''
          return state


      case UNDO:
        return state
      
       
      case REDO:
        return state
      default:
        return state
    }
  }
  
  const [state, dispatch] = useReducer(reducer, initialState)


  const handleAdd = (e) => {
    e.preventDefault();
    dispatch({type: INCREMENT, payload: inputValue.current.value})
    inputValue.current.value = ''
  };

  const handleRemove = () => {
    if (inputValue.current.value === '') {
      alert("Enter a Value")
      return
    }
    dispatch({type: REMOVE, payload: inputValue.current.value})
              
  }

const handleUndo = () => {
  dispatch({type: UNDO})
}
const handleRedo = () => {
  dispatch({type: REDO})
}
console.log(state)
  return (
    <div className="App">
      <h1>Welcome to My TODO App</h1>
      <div className="screen">
        <form action="" onSubmit={handleAdd}>
          <input
            ref={inputValue}
            type="number"
            placeholder="Enter number to add or remove"
          />
        </form>
        <div className="btn-container">
          <button onClick={()=>
            dispatch({type: INCREMENT, payload: inputValue.current.value})
              } >ADD</button>
          <button onClick={handleRemove}>REMOVE</button>

          <button onClick={handleUndo} >UNDO</button>
          
          <button disabled onClick={handleRedo }>REDO</button>
        </div>



        <h1>My List</h1>

        <div className="present-container">
          {
            state.present.length < 1 ? <h3>List is Empty</h3> : (
              state.present.map((num) => (
                <h3 key={Date.now() + Math.random() * 100 + 10}>{num}</h3>
              ))
            )
          }
          
        </div>
      </div>
    </div>
  );
}

export default App;
