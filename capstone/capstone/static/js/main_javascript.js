$(document).ready(function() {
    console.log("1111", 1111);
    function openOverlay() {
        const overlay = document.getElementById("overlay");
        if (overlay) {
            overlay.style.display = "block";
        }
    }

    function closeOverlay() {
        const overlay = document.getElementById("overlay");
        if (overlay) {
            overlay.style.display = "none";
        }
    }

    const openOverlayButton = document.getElementById("openOverlayButton");
    if (openOverlayButton) {
    openOverlayButton.addEventListener("click", openOverlay);
    }

    const closeOverlayButton = document.getElementById("closeOverlayButton");
    if (closeOverlayButton) {
    closeOverlayButton.addEventListener("click", closeOverlay);
    }

    function openOverlay1() {
        const overlay = document.getElementById("overlay1");
        if (overlay) {
            overlay.style.display = "block";
        }
    }

    function closeOverlay1() {
        const overlay = document.getElementById("overlay1");
        if (overlay) {
            overlay.style.display = "none";
        }
    }

    const openOverlayButton1 = document.getElementById("openOverlayButton1");
    if (openOverlayButton1) {
        openOverlayButton1.addEventListener("click", openOverlay1);
    }

    const closeOverlayButton1 = document.getElementById("closeOverlayButton1");
    if (closeOverlayButton1) {
        closeOverlayButton1.addEventListener("click", closeOverlay1);
    }


    function openOverlay2() {
        const overlay = document.getElementById("overlay2");
        if (overlay) {
            overlay.style.display = "block";
        }
    }
    function closeOverlay2() {
        const overlay = document.getElementById("overlay2");
        if (overlay) {
            overlay.style.display = "none";
        }
    }

    const openOverlayButton2 = document.getElementById("openOverlayButton2");
    if (openOverlayButton2) {
        openOverlayButton2.addEventListener("click", openOverlay2);
    }

    const closeOverlayButton2 = document.getElementById("closeOverlayButton2");
    if (closeOverlayButton2) {
        closeOverlayButton2.addEventListener("click", closeOverlay2);
    }

    function openOverlay3() {
        const overlay = document.getElementById("overlay3");
        if (overlay) {
            overlay.style.display = "block";
        }
    }

    function closeOverlay3() {
        const overlay = document.getElementById("overlay3");
        if (overlay) {
            overlay.style.display = "none";
        }
    }

    const openOverlayButton3 = document.getElementById("openOverlayButton3");
    if (openOverlayButton3) {
        openOverlayButton3.addEventListener("click", openOverlay3);
    }

    const closeOverlayButton3 = document.getElementById("closeOverlayButton3");
    if (closeOverlayButton3) {
        closeOverlayButton3.addEventListener("click", closeOverlay3);
    }

    // Overlay 4
    function openOverlay4() {
        const overlay = document.getElementById("overlay4");
        if (overlay) {
            overlay.style.display = "block";
        }
    }

    function closeOverlay4() {
        const overlay = document.getElementById("overlay4");
        if (overlay) {
            overlay.style.display = "none";
        }
    }

    const openOverlayButton4 = document.getElementById("openOverlayButton4");
    if (openOverlayButton4) {
        openOverlayButton4.addEventListener("click", openOverlay4);
    }

    const closeOverlayButton4 = document.getElementById("closeOverlayButton4");
    if (closeOverlayButton4) {
        closeOverlayButton4.addEventListener("click", closeOverlay4);
    }

    // Overlay 5
    function openOverlay5() {
        const overlay = document.getElementById("overlay5");
        if (overlay) {
            overlay.style.display = "block";
        }
    }

    function closeOverlay5() {
        const overlay = document.getElementById("overlay5");
        if (overlay) {
            overlay.style.display = "none";
        }
    }

    const openOverlayButton5 = document.getElementById("openOverlayButton5");
    if (openOverlayButton5) {
        openOverlayButton5.addEventListener("click", openOverlay5);
    }

    const closeOverlayButton5 = document.getElementById("closeOverlayButton5");
    if (closeOverlayButton5) {
        closeOverlayButton5.addEventListener("click", closeOverlay5);
    }

    // Overlay 6
    function openOverlay6() {
        const overlay = document.getElementById("overlay6");
        if (overlay) {
            overlay.style.display = "block";
        }
    }

    function closeOverlay6() {
        const overlay = document.getElementById("overlay6");
        if (overlay) {
            overlay.style.display = "none";
        }
    }

    const openOverlayButton6 = document.getElementById("openOverlayButton6");
    if (openOverlayButton6) {
        openOverlayButton6.addEventListener("click", openOverlay6);
    }

    const closeOverlayButton6 = document.getElementById("closeOverlayButton6");
    if (closeOverlayButton6) {
        closeOverlayButton6.addEventListener("click", closeOverlay6);
    }


});


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function updateTaskStatus(checkbox) {
    console.log("Checkbox changed");
    const taskId = $(checkbox).data('task-id');
    const isChecked = checkbox.checked;

    $.ajax({
        url: "/update_task_status/",
        method: "POST",
        data: {
            task_id: taskId,
            is_done: isChecked,
            csrfmiddlewaretoken: getCookie("csrftoken"),
        },
        success: function(response) {
            console.log("Task status updated successfully.");
            console.log("Updated Task Data:", response.task);
            const updatedTask = response.task;

            if (updatedTask.is_done) {
                const taskElement = $(checkbox).closest(".sample");
                console.log("Task Element:", taskElement);

                taskElement.appendTo("#doneTasks");
                console.log("Task moved to 'Done'");
            }
        },
        error: function(xhr, status, error) {
            console.error("Error updating task status:", error);
        }
    });
}

// Call updateTaskStatus for any checkboxes with the 'update-checkbox' class
$(".update-checkbox").change(function() {
    updateTaskStatus(this);
});

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var noTaskImageUrl = "/static/img/No_Task.png"

    var calendar = new FullCalendar.Calendar(calendarEl, {
        // Configuration options
        initialView: 'dayGridMonth',
    
        dayMaxEventRows: 4,
        dateClick: function(info) {
            // Get the clicked date
            var selectedDate = info.dateStr;
            
            // Send an AJAX request to fetch tasks for the selected date
            fetch('/api/tasks-for-date/' + selectedDate) // Replace with your API endpoint
                .then(response => response.json())
                .then(data => {
                    console.log('Selected Date:', selectedDate);
                    // Clear the "selectedDateTasksContainer"
                    var selectedDateTasksContainer = document.getElementById('scheduleToday');
                    selectedDateTasksContainer.innerHTML = '<div class="mt-2 schedule_header">SCHEDULE TODAY:</div>'; // Reset the header

                    if (data.length === 0) {
                        // If there are no tasks for the selected date, display the image and text
                         // This line causes the issue
                         selectedDateTasksContainer.innerHTML += '<img src="' + noTaskImageUrl + '" alt="No Tasks Today Image" class="no-task-img">';
                         selectedDateTasksContainer.innerHTML += '<p class="no-tasks-text">No Tasks Today.</p>';
                    } else {
                        // Loop through the fetched tasks and create a separate tab for each task
                        data.forEach(task => {
                            var taskTab = document.createElement('div');
                            taskTab.className = 'mt-2 p-2 custom_sched_tab'; // Apply your CSS classes
        
                            // Add a checkbox
                            var checkbox = document.createElement('input');
                            checkbox.type = 'checkbox';
                            checkbox.dataset.taskId = task.id;
        
                            // Set the checkbox state based on is_done
                            if (task.is_done) {
                                checkbox.setAttribute('checked', 'checked');
                            }
        
                            var label = document.createElement('label');
                            label.className = 'checkbox-container';
                            label.appendChild(checkbox);
                            label.innerHTML += '<span class="checkmark"></span>';
        
                            // Display the task name
                            taskTab.textContent = task.task_name;
        
                            taskTab.appendChild(label);
        
                            // Append the task tab to the container
                            selectedDateTasksContainer.appendChild(taskTab);
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching tasks for the selected date:', error);
                });
        }
    });

    calendar.render();

    // Event delegation for dynamically created checkboxes
    document.getElementById('scheduleToday').addEventListener('change', function(event) {
        if (event.target.type === 'checkbox') {
            updateTaskStatus(event.target);
        }
    });
});



document.getElementById('scheduleToday').addEventListener('mousedown', function (e) {
    if (e.button === 1) { // Check if the middle mouse button (button 1) is clicked
        // Prevent the default behavior (e.g., text selection)
        e.preventDefault();

        // Store the initial mouse position and scroll position
        const initialMouseY = e.clientY;
        const initialScrollTop = this.scrollTop;

        // Handle mousemove events to scroll the container
        const handleMouseMove = (e) => {
            // Calculate the amount to scroll based on the mouse movement
            const deltaY = e.clientY - initialMouseY;

            // Update the scroll position
            this.scrollTop = initialScrollTop - deltaY;
        };

        // Handle mouseup event to stop scrolling
        const handleMouseUp = () => {
            // Remove the event listeners to stop scrolling
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        // Add event listeners for mousemove and mouseup to enable scrolling
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
});
