document.addEventListener("DOMContentLoaded",()=>{
const addbutton = document.querySelector("#add");
const deletebutton = document.querySelector("#deletebutton");
const tasklist = document.querySelector("#tasklist");
const bigtxt = document.querySelector("#bigtext");
let localdata = [];
const color = ["red", "yellow", "green", "white"]


function displaydate(element) {
  let date = new Date();
  let year = date.getFullYear();
  let monthlist = [
    "jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "july",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = monthlist[date.getMonth()];
  let daylist = ["sun", "Mon", "Tue", "Wed", "Thur", "fri", "sat"];
  let day = daylist[date.getDay()];
  let datee = date.getDate();
  let display = document.querySelector(element);
  display.textContent = `${day}, ${datee}/${month}/${year}`;
}

function displaydata(data) {
  tasklist.innerHTML = "";
  data.forEach((item, index) => {
    let addtask = document.createElement("li");

    let taskitem = document.createElement("label");
    let radio = document.createElement("input");
    let priority = document.createElement("select");
    priority.style.textAlign = "center";
    let option = document.createElement("option");
    option.setAttribute("value", "option");
    option.textContent = "Priority";
    let high = document.createElement("option");
    high.setAttribute("value", "high");
    high.textContent = "high-priority";
    let medium = document.createElement("option");
    medium.setAttribute("value", "medium");
    medium.textContent = "medium-priority";
    let low = document.createElement("option");
    low.setAttribute("value", "low");
    low.textContent = "low-priority";

    radio.setAttribute("type", "checkbox");
    
    radio.setAttribute("id", `radiobutton${index}`);
    taskitem.textContent = item.task;

    radio.style.margin= "10px";
    priority.style.margin = "10px";
    addtask.style.margin = "10px";
    addtask.style.borderRadius = "10px";
    addtask.style.border ="2px solid grey" 

    addtask.appendChild(radio);
    addtask.appendChild(taskitem);
    tasklist.appendChild(addtask);
    addtask.appendChild(priority);
    priority.appendChild(option);
    priority.appendChild(high);
    priority.appendChild(medium);
    priority.appendChild(low);

    radio.checked = item.done || false;
    priority.value = item.priority || "option";
    addtask.style.backgroundColor = item.color ||"white";
    taskitem.style.textDecorationLine =item.line || "none";



    radio.addEventListener("change", () => {
      item.done = radio.checked;
      localStorage.setItem("item", JSON.stringify(localdata));
     

      if (item.done) {
        taskitem.style.textDecorationLine = "line-through";
        item.line = "line-through";
        localStorage.setItem("item", JSON.stringify(localdata));
        
      } else {
        taskitem.style.textDecorationLine = "none";
        item.line = "none";
        localStorage.setItem("item", JSON.stringify(localdata));
      }
    });

    priority.addEventListener("change", () => {
      item.priority = priority.value;
      localStorage.setItem("item", JSON.stringify(localdata));
      switch (item.priority) {
        case "high":
          addtask.style.backgroundColor = color[0];
          item.color = color[0];
          localStorage.setItem("item", JSON.stringify(localdata))

          break;
        case "medium":
          addtask.style.backgroundColor = color[1];
          item.color = color[1];
          localStorage.setItem("item", JSON.stringify(localdata))
          break;
        case "low":
          addtask.style.backgroundColor = color[2];
          item.color = color[2];
          localStorage.setItem("item", JSON.stringify(localdata))
          break;
          case "option":  // Add this case for "option"
          addtask.style.backgroundColor = color[3];
          item.color = color[3];
          localStorage.setItem("item", JSON.stringify(localdata));
          break;  
        default:
          
      }
    });
    taskitem.addEventListener("click",(e)=>{
     bigtxt.textContent = e.target.textContent;
    })
  });
    
}



addbutton.addEventListener("click", () => {
  let text = document.querySelector(".showtask").value.trim();
  if (text === "") {
    alert("Please Enter a Valid Task");
  } else {
    let myobject = {
      task: text,
      done: false,
      priority: "option",
      color: color[3],
      line: "none",
    };
    localdata.push(myobject);
    localStorage.setItem("item", JSON.stringify(localdata));
    displaydata(localdata);
  }
  document.querySelector(".showtask").value = "";
});

deletebutton.addEventListener("click", () => {
  if (localdata.length === 0) {
    alert("You have not created any tasks.");
  } else {
    tasklist.removeChild(tasklist.lastElementChild);
    localdata.pop();
    localStorage.setItem("item", JSON.stringify(localdata));
  }
});

localdata = JSON.parse(localStorage.getItem("item")) || [];
displaydata(localdata);
displaydate(".date");
});