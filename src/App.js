import './App.css';
import {useState} from "react";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [list, setList] = useState(["Make a To Do List App", "Write the logic", "Design layout", "Apply CSS", "Deploy to Git/Netlify", "Celebrate", "Enjoy weekend"]);
  const [archiveList, setArchiveList] = useState([""]);
  // const [edit, setEdit] = useState(false)
 
  const changeHandler = (event) =>{
    setInputText(event.target.value);
  }

  const handleAddItem = () => {
    let storedList = [...list];
    storedList.push(inputText);
    setList(storedList);
    setInputText("");
    }

  const handleRemoveItem = (index) => {
    let storedList = [...list];
    let archiveListCopy = [...archiveList];
    archiveListCopy.push(storedList.splice(index, 1));
    setList(storedList);
    setArchiveList(archiveListCopy);
    }
  const AddEdit = (index, UpdateTask) => {
    let EditCopy = [...list];
    EditCopy[index] = UpdateTask;
    setList(EditCopy);
  }

  return (
  <>
  <div className='ListWrap'>
  <h1>To Do List</h1>
  {list.map ((list, index) =>{
    return (
      <CheckState  key ={index} ListText ={list} RemoveFunct = {()=>handleRemoveItem(index)} 
       AddEdit = {AddEdit} EdIndex = {index}>
      </CheckState>
    ) 
  })}
  
  <div className='AddFunct'>
  <input value = {inputText} type = "text" onChange={changeHandler}></input>
  <button className='SubNew' onClick={handleAddItem}> Add new </button>
  </div>
</div>
  <div className='ArchiveWrap'>
    <h1>Archived Tasks</h1>
    {archiveList.map ((archiveList, index) => {
      return <p className='ArchItem' key ={index} >{archiveList}</p>
      })}
  </div>
  </>
)
}

const CheckState = (props) => {
  const [check, setCheck] = useState(false)
  const [edit, setEdit] = useState(false)
  const [inputText, setInputText] = useState(props.ListText);
  const EditHandler = (event) =>{
    setInputText(event.target.value);    
  }
  const SubmitEdit = () => {
    setEdit(!edit);
    props.AddEdit(props.EdIndex, inputText)

  }
  return (
    <p className={check ? "ItemDone" : "ItemNot"} > {props.ListText}
    <input type = "checkbox" defaultChecked = {check} onClick = {() => setCheck(!check)} ></input>
    <button onClick={props.RemoveFunct}>Remove</button>
    
    <button onClick = {() => setEdit(!edit)}>Edit</button>
    <input className={edit ? 'EditTask' : "HideEdit"} value = {inputText} onChange={EditHandler}></input>
    <button className= {edit ? "EditTask" : "HideEdit"} onClick = {SubmitEdit} >submit</button> 
    </p>
  )
}   

export default App;



