  let addbutton = document.querySelector("#add");
  let deletebutton = document.querySelector("#deletebutton");
  let tasklist = document.querySelector("#tasklist");
  function displaydate(element) {
    let date = new Date();
    let year = date.getFullYear();
    let monthlist = ["jan", "Feb", "March", "April", "May", "June", "july", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let month = monthlist[date.getMonth()];
    let daylist = ["sun", "Mon", "Tue", "Wed", "Thur", "fri", "sat"];
    let day = daylist[date.getDay()];
    let datee = date.getDate();
    let display = document.querySelector(element);
    display.textContent =  `${day}, ${datee}/${month}/${year}` ;

  }
  function displaydata(data){
       tasklist.innerHTML=" ";
       data.forEach((element, index )=> {
        let addtask = document.createElement("li");
        addtask.textContent = data[index].task;
        tasklist.appendChild(addtask);
    });
}
let localdata =JSON.parse(localStorage.getItem("item"))??[];
displaydata(localdata);
displaydate(".date");
  add.addEventListener("click",()=>{
    let text = document.querySelector(".showtask").value;
    if (text == "") {
      alert("Please Enter Valid Task");
    }
    else {   
     localdata.push({
        task:text,
    })
    localStorage.setItem("item",JSON.stringify(localdata));
    displaydata(localdata);
    }  
    document.querySelector(".showtask").value ="";
  });

  deletebutton.addEventListener("click",()=> {
    if (localdata.length == 0) {

      alert("You are not created any Task");
    }
    else {
        
      tasklist.removeChild(tasklist.lastElementChild)
      localdata.pop();
      localStorage.setItem("item", JSON.stringify(localdata));
    }
  })
  displaydata(localdata);