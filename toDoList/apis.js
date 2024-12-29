const init = () => {
    document.querySelector("#newTask").addEventListener("click", addNewTask);
};

const tasks = () => {
    let url = "https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks/9000835";
    let apiKey = "Itcheui2tB58SlUGe8rrP8mskudGsNDT9nfKKG9S";
    let xhr =  new XMLHttpRequest();
    xhr.open("get", url);
    xhr.setRequestHeader("x-api-key", apiKey);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.response);
            console.log(data);
            let tasks = document.getElementById("tasks");
            for (let i = 0; i < data.Items.length; i++){
                let li = document.createElement("li");
                li.innerHTML = "    " + data.Items[i].Description;
                li.classList.add("fa", "fa-trash");
                li.style.padding = ".5em";
                tasks.appendChild(li);
                // Adding click for each li item 
                li.addEventListener("click", () => {
                    tasks.removeChild(li); // Li öğesini kaldırma
                    deleteTask(data.Items[i].Description);
                });
            }
        }
    }
    
    
    
}

// Delete
const deleteTask = (taskDescription) => {
    let deleteUrl = "https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks";
    let deleteApiKey = "Itcheui2tB58SlUGe8rrP8mskudGsNDT9nfKKG9S";
    let deleteXhr =  new XMLHttpRequest();
    let params = {
        StudentId: "9000835",
        Description: taskDescription
    }
    console.log(params);
    deleteXhr.open("delete", deleteUrl);
    deleteXhr.setRequestHeader("x-api-key", deleteApiKey);
    deleteXhr.setRequestHeader("Content-Type", "application/json");
    
    deleteXhr.onreadystatechange = () => {

        if (deleteXhr.readyState == 4 && deleteXhr.status === 200) {
            console.log("Task deleted successfully.");
            tasks();
        }
    }
    deleteXhr.send(JSON.stringify(params));
}

const addNewTask = () => {
    console.log("Adding a new task");

    let xhr = new XMLHttpRequest();
    let url = "https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks";
    let apiKey = "Itcheui2tB58SlUGe8rrP8mskudGsNDT9nfKKG9S";
    let studenId = "9000835";
    let taskDescription = document.querySelector("#task").value;
    let params = {
        StudentId : studenId,
        Description : taskDescription
    };

    xhr.open("post", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-api-key", apiKey);

    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            console.log("new record was added......");
        }
    };
    xhr.send(JSON.stringify(params));
};
window.onload = init;
window.onload = tasks;