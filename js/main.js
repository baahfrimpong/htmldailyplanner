$(document).ready(function(){
    
    //AddTask event
    $('#add-task-form').on('submit', function(x){
        addTask(x);
    });
    
    //Edit Event
    $('#edit-task-form').on('submit', function(x) {
       updateTask(x); 
    });
    
    //Remove Task Event
     $('#task-table').on('click', '#remove-task', function() {
         id = $(this).data('id');
         removeTask(id);
     });
    
    //Clear all Tasks
    $('#clear-tasks ').on('click', function() {
        clearAllTasks(); 
    })
    
    displayTasks();
    
    //Function to display all tasks in a table.
    function displayTasks() {
        
        var taskList = JSON.parse(localStorage.getItem("tasks"));
        
        if(taskList != null) {
            taskList = taskList.sort(sortByTime);
            
        }
        
        //Set a Counter for tasks
        var i = 0;
        //Check tasks
        if(localStorage.getItem('tasks') != null) {
            //Loop through and display
            $.each(taskList, function(key, value) {
                 $('#task-table').append('<tr id="'+ value.id +'">' + 
                                         '<td>' + value.task + '</td>' +
                                         '<td>' + value.task_priority + '</td>' +
                                         '<td>' + value.task_date + '</td>' +
                                         '<td>' + value.task_time + '</td>' +
                                         '<td><a href="edit.html?id=' + value.id + '">Edit</a> | <a href="#" id="remove-task" data-id="'+ value.id +'">Delete</a></td>' + 
                                         '</tr>');
            })
        }
    }
    
    //Function to sort tasks
    function sortByTime(x, y) {
        
        var xTime = x.task_time;
        var yTime = y.task_time;
        return ((xTime < yTime) ?  -1 : (( xTime > yTime) ? 1 : 0));
    }
    
     //Function to add a task.
    function addTask(x) {
        //Add a unique ID
        var newDate = new Date();
            id = newDate.getTime();
        
        var task = $('#task').val();
        var task_priority = $('#priority').val();
        var task_date = $('#date').val();
        var task_time = $('#time').val();
        
        //Simple validation
        if(task == '') {
            alert("Task name is required!");
            x.preventDefault();
            
        } else if(task_priority == '') {
            task_priority = "normal";
            
        } else if(task_date == '') {
            alert("A date is required!");
            x.preventDefault();
            
        }else if(task_time == '') {
            alert("Task time is required!");
            x.preventDefault();
            
        } else {
            
            tasks = JSON.parse(localStorage.getItem('tasks'));
            
            //Create tasks
            if(tasks == null) {
                tasks = [];
            }
            
            var tasklist = JSON.parse(localStorage.getItem('tasks'));
            
            //New task
            var new_task = {
                "id": id,
                "task": task,
                "task_priority": task_priority,
                "task_date": task_date,
                "task_time": task_time
            }
            
            tasks.push(new_task);
            localStorage.setItem("tasks", JSON.stringify(tasks)); 
            
            console.log("Task Added!");
        }
    }
    
    //Function to update Task
    function updateTask(x) {
        var id = $('#task_id').val();
        var task = $('#task').val();
        var task_priority = $('#priority').val();
        var task_date = $('#date').val();
        var task_time = $('#time').val();
        
        tasklist = JSON.parse(localStorage.getItem('tasks'));
        
        for(var i=0; i < tasklist.length; i++) {
            if(tasklist[i].id == id) {
                tasklist.splice(i, 1);
            }
            
            localStorage.setItem('tasks', JSON.stringify(tasklist));
        }
        
        //Simple validation
        if(task == '') {
            alert("Task name is required!");
            x.preventDefault();
            
        } else if(task_priority == '') {
            task_priority = "normal";
            
        } else if(task_date == '') {
            alert("A date is required!");
            x.preventDefault();
            
        }else if(task_time == '') {
            alert("Task time is required!");
            x.preventDefault();
            
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
            
            //Create tasks
            if(tasks == null) {
                tasks = [];
            }
            
            var tasklist = JSON.parse(localStorage.getItem('tasks'));
            
            //New task
            var new_task = {
                "id": id,
                "task": task,
                "task_priority": task_priority,
                "task_date": task_date,
                "task_time": task_time
            }
            
            tasks.push(new_task);
            localStorage.setItem("tasks", JSON.stringify(tasks)); 
            
            console.log("Task Editted!");
        }
    }
    
    //Function to remove Task
    function removeTask(id) {
         if(confirm('Are you sure you want to delete this task?')) {
             var tasklist = JSON.parse(localStorage.getItem('tasks'));
             
             for(var i=0; i < tasklist.length; i++) {
            if(tasklist[i].id == id) {
                tasklist.splice(i, 1);
                }
            
            localStorage.setItem('tasks', JSON.stringify(tasklist));
            }
             
             location.reload();
         }
    }
    
    //Function to Clear All Tasks
    function clearAllTasks() {
        if(confirm('Are you sure you want to clear  all tasks?')) {
             localStorage.clear();
            location.reload();
        }
    }
});

//Function for getting a single task
function getTask() {
    var $_GET = getQueryParams(document.location.search);
    id = $_GET['id'];
    
    var taskList = JSON.parse(localStorage.getItem('tasks'));
    
    for(var i=0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            $('#edit-task-form #task_id').val(taskList[i].id);
            $('#edit-task-form #task').val(taskList[i].task);
            $('#edit-task-form #priority').val(taskList[i].task_priority);
            $('#edit-task-form #date').val(taskList[i].task_date);
            $('#edit-task-form #time').val(taskList[i].task_time);
        }
    }
}

//Function to GET HTTP get requests
function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^8]*)/g;
    
    while(tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    
    return params;
}