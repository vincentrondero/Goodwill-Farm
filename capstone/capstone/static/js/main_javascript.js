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
    $(".delete_button").click(function () {
        var userId = $(this).data("user-id");
        var user_type = $(this).data("user-type"); // Get user_type from data attribute
        var deleteButton = $(this); // Store a reference to the button clicked
        var csrfToken = $('input[name="csrfmiddlewaretoken"]').val();
    
        // Confirm the user wants to delete before proceeding
        var confirmDelete = confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            // Construct the correct URL for the AJAX request
            var deleteUrl = '/delete_user/' + user_type + '/';  // Update with the correct URL pattern
    
            // Send an AJAX request to delete the user
            $.ajax({
                url: deleteUrl,
                method: "POST",
                data: { action: 'delete_user', id: userId, csrfmiddlewaretoken: csrfToken },
                success: function (response) {
                    // Handle success, maybe remove the row from the table
                    if (response.success) {
                        // Remove the table row
                        deleteButton.closest("tr").remove(); // Use the reference to the button
                    }
                },
                error: function (xhr, errmsg, err) {
                    // Handle errors
                    console.log(err);
                },
            });
        }
    });
    

    // Add click event handler for the edit button
    $(".edit_button").click(function () {
        // Show the edit overlay
        $("#edit_overlay").show();
    
        // Get the user data from the clicked row
        var row = $(this).closest("tr");
        var firstname = row.find("td:nth-child(1)").text();
        var lastname = row.find("td:nth-child(2)").text();
        var username = row.find("td:nth-child(3)").text();
        var role = row.find("td:nth-child(4)").text();
        var date = row.find("td:nth-child(5)").text();
    
        // Populate the overlay fields with the user data
        $("#edit_firstname").val(firstname);
        $("#edit_lastname").val(lastname);
        $("#edit_username").val(username);
        $("#edit_role").val(role);
        $("#edit_date").val(date);
    
        // Store the user ID in a data attribute
        var userId = $(this).data("user-id");
        $(".save-button").data("user-id", userId);

        $("#cancel-button").click(function () {
            // Hide the edit overlay when the "Cancel" button is clicked
            $("#edit_overlay").hide();
        });
    });
    
    // Add click event handler for the save button
    $(".save-button").click(function (e) {
        e.preventDefault(); // Prevent the default form submission
    
        // Store a reference to the button element that was clicked
        var clickedButton = $(this);
    
        // Get user ID and user type from data attributes
        var userId = clickedButton.data("user-id");
        console.log("UserID (Primary Key): " + userId);
        var user_type = clickedButton.data("user-type");
    
        // Get the CSRF token from the form
        var csrfToken = $('input[name="csrfmiddlewaretoken"]').val();
    
        // Confirm the user wants to update before proceeding
        var confirmUpdate = confirm("Are you sure you want to update this user?");
    
        if (confirmUpdate) {
            // Debugging: Log the value of #edit_date to check if it's retrieved correctly
            var dateString = $("#edit_date").val();
            console.log("Date String: " + dateString);
    
            // Construct the correct URL for the AJAX request
            var updateUrl = '/update_user/' + user_type + '/';
    
            // Retrieve the updated user data from your form fields
            var updatedData = {
                id: userId,  // Include user ID
                username: $("#edit_username").val(),
                firstname: $("#edit_firstname").val(),
                lastname: $("#edit_lastname").val(),
                role: $("#edit_role").val(),
                date: formatDate(dateString), // Convert the date
                csrfmiddlewaretoken: csrfToken,
            };
    
            // Send an AJAX request to update the user using POST
            $.ajax({
                url: updateUrl,
                method: "POST",
                data: updatedData,
                success: function (response) {
                    console.log("Update Response:", response); // Log the response for debugging
    
                    if (response.success) {
                        var updatedUser = response.updated_user;
    
                        // Find the closest table row to the clicked button and update its contents
                        var tableRow = clickedButton.closest("tr");
    
                        // Update the table cells with the new data
                        tableRow.find("td:nth-child(1)").text(updatedUser.firstname);
                        tableRow.find("td:nth-child(2)").text(updatedUser.lastname);
                        tableRow.find("td:nth-child(3)").text(updatedUser.username);
                        tableRow.find("td:nth-child(4)").text(updatedUser.role);
                        tableRow.find("td:nth-child(5)").text(updatedUser.date);
    
                        // Hide the edit overlay after successful update
                        $("#edit_overlay").hide();

                        location.reload();
                    }
                },
                error: function (xhr, errmsg, err) {
                    // Handle errors
                    console.log("Update Error:", err);
                },
            });
        }
    });

    $(".delete_pigs_button").click(function () {
        var pigId = $(this).data("pig-id");
        var user_type = $(this).data("user-type"); 
        var deleteButton = $(this); 
        var csrfToken = $('input[name="csrfmiddlewaretoken"]').val();
    
        var confirmDelete = confirm("Are you sure you want to delete this pig?");
        if (confirmDelete) {
            var deleteUrl = '/delete_pig/' + user_type + '/' + pigId + '/';
    
            $.ajax({
                url: deleteUrl,
                method: "POST",
                data: { csrfmiddlewaretoken: csrfToken, id: pigId }, // Include pigId here
                success: function (response) {
                    if (response.success) {
                        // Remove the pig element from the UI
                        deleteButton.closest(".bg-light").remove();
                    }
                },
                error: function (xhr, errmsg, err) {
                    console.log(err);
                },
            });
        }
    });

    $(".edit_pigs_button").click(function () {
        // Show the edit overlay for pigs
        $("#edit_pig_overlay").show();
    
        // Get the pig ID from the clicked element
        var pigId = $(this).data("pig-id");
        var userType = $(this).data("user-type");
        console.log("User Type:", userType);

    
        // Make an AJAX request to fetch the pig data based on the pig ID and user type
        var updatePigUrl = '/get_pig_data/' + pigId + '/';
    
        $.ajax({
            url: updatePigUrl,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    // Populate the overlay fields with the pig data
                    $("#edit_pig_id").val(data.pig_data.pig_id);
                    $("#edit_dam").val(data.pig_data.dam);
                    $("#edit_dob").val(data.pig_data.dob);
                    $("#edit_sire").val(data.pig_data.sire);
                    $("#edit_pig_class").val(data.pig_data.pig_class);
                    $("#edit_sex").val(data.pig_data.sex);
                    $("#edit_count").val(data.pig_data.count);
                    $("#edit_weight").val(data.pig_data.weight);
                    $("#edit_remarks").val(data.pig_data.remarks);
    
                    // Store the pig ID in a data attribute for the Save Pig button
                    $(".save-pig-button").data("pig-id", pigId);
                } else {
                    alert("Failed to fetch pig data. Please try again.");
                }
            },
            error: function () {
                // Handle AJAX error
                alert("An error occurred while fetching pig data.");
            }
        });
    });
    
    // Click event handler for the save button
    $(".save-pig-button").click(function (e) {
        e.preventDefault(); // Prevent the default form submission
    
        // Store a reference to the button element that was clicked
        var clickedButton = $(this);
    
        // Get pig ID from data attribute
        var pigId = clickedButton.data("pig-id");
    
        // Get the CSRF token from the form
        var csrfToken = $('input[name="csrfmiddlewaretoken"]').val();
    
        // Construct the correct URL for the AJAX request
        var userType = $(this).data("user-type");
        var updatePigUrl = '/update_pig/' + pigId + '/' + userType + '/';
    
        // Retrieve the updated pig data from your form fields
        var updatedPigData = {
            pig_id: pigId,
            dam: $("#edit_dam").val(),
            dob: $("#edit_dob").val(), // Add date of birth field
            sire: $("#edit_sire").val(), // Add sire field
            pig_class: $("#edit_pig_class").val(), // Add pig class field
            sex: $("#edit_sex").val(), // Add sex field
            count: $("#edit_count").val(), // Add count field
            weight: $("#edit_weight").val(), // Add weight field
            remarks: $("#edit_remarks").val(), // Add remarks field
            csrfmiddlewaretoken: csrfToken,
        };
    
        // Send an AJAX request to update the pig using POST
        $.ajax({
            url: updatePigUrl,
            method: "POST",
            data: updatedPigData,
            success: function (response) {
                console.log("Update Pig Response:", response); // Log the response for debugging
    
                if (response.success) {
                    // Update the pig data in the UI (you can add your logic here)
                    // For example, update the status of the pig
    
                    // Hide the edit pig overlay after successful update
                    $("#edit_pig_overlay").hide();
                }
            },
            error: function (xhr, errmsg, err) {
                // Handle errors
                console.log("Update Pig Error:", err);
            },
        });
    });
    
    $(".cancel-button").click(function (e) {
        e.preventDefault(); // Prevent the default form submission
    
        // Hide the edit pig overlay
        $("#edit_pig_overlay").hide();
    });
    
    $(".delete_sow_button").click(function () {
        var sowId = $(this).data("sow-id"); 
        var user_type = $(this).data("user-type"); 
        var deleteButton = $(this); 
        var csrfToken = $('input[name="csrfmiddlewaretoken"]').val();
    
        var confirmDelete = confirm("Are you sure you want to delete this sow?");
        if (confirmDelete) {
            var deleteSowUrl = '/delete_sow/' + user_type + '/' + sowId + '/';  // Update URL for deleting sows
    
            $.ajax({
                url: deleteSowUrl,
                method: "POST",
                data: { csrfmiddlewaretoken: csrfToken, id: sowId },  // Include sowId here
                success: function (response) {
                    if (response.success) {
                        // Remove the sow element from the UI
                        deleteButton.closest(".bg-light").remove();
                    }
                },
                error: function (xhr, errmsg, err) {
                    console.log(err);
                },
            });
        }
    });
    // Add an event listener for the sow data edit button
    $(".edit_sow_button").click(function () {
        var sowId = $(this).data("sow-id");
        var userType = $(this).data("user-type");
        console.log("User Type:", userType);
    
        // Make an AJAX request to fetch the sow data based on the sow ID and user type
        var updateSowUrl = '/get_sow_data/' + sowId + '/';
    
        $.ajax({
            url: updateSowUrl,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log("Data received from the server:", data);
                if (data.success) {
                    // Populate the overlay fields with the sow data
                    $("#edit_sow_id").val(data.sow_data.sow_id);
                    $("#edit_sow_dam").val(data.sow_data.dam);
                    $("#edit_sow_dob").val(data.sow_data.dob);
                    $("#edit_sow_sire").val(data.sow_data.sire);
                    $("#edit_sow_pig_class").val(data.sow_data.pig_class);
                    $("#edit_sow_sex").val(data.sow_data.sex);
                    $("#edit_sow_count").val(data.sow_data.count);
                    $("#edit_sow_weight").val(data.sow_data.weight);
                    $("#edit_sow_remarks").val(data.sow_data.remarks);
                    
                    // Store the pk for later use in the update
                    $("#edit_sow_pk").val(data.sow_data.pk);
                    $("#edit_sow_form").attr("action", '/update_sow_data/' + userType + '/' + sowId + '/');
                    // Show the sow data edit overlay
                    $("#edit_sow_overlay").show();
                } else {
                    alert("Failed to fetch sow data. Please try again.");
                }
            },
            error: function () {
                alert("An error occurred while fetching sow data.");
            }
        });
        
        // Event handler to close the overlay when "Cancel" button is clicked
        $("#cancel-sow-button").click(function () {
            // Hide the sow data edit overlay when the "Cancel" button is clicked
            $("#edit_sow_overlay").hide();
        });
    });
    
    // Add an event listener for the sow data save button
    $(".save-sow-button").click(function () {
        // Get the sow data from the overlay fields

    e.preventDefault(); // Prevent the default form submission

    // Store a reference to the button element that was clicked
    var clickedButton = $(this);

    // Get sow ID from data attribute
    var sowId = clickedButton.data("sow-id");
    var userType = $(this).data("user-type");
    
        // Create the updated data including the pk
        var updatedData = { 
            pk: sowPk, // Include the primary key
            sow_id: sowId,
            dam: $("#edit_sow_dam").val(),
            dob: $("#edit_sow_dob").val(),
            sire: $("#edit_sow_sire").val(),
            pig_class: $("#edit_sow_pig_class").val(),
            sex: $("#edit_sow_sex").val(),
            count: $("#edit_sow_count").val(),
            weight: $("#edit_sow_weight").val(),
            remarks: $("#edit_sow_remarks").val(),
            user_type: userType,
            // Add more fields as needed
        };
    
        // Make an AJAX request to update the sow data
        var updateSowUrl = '/update_sow_data/' + userType + '/' + sowId + '/';
    
        $.ajax({
            url: updateSowUrl,
            method: 'POST',
            data: updatedData,
            dataType: 'json',
            // Include the CSRF token in the headers
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
            },
            success: function (data) {
                if (data.success) {
                    alert("Sow data updated successfully.");
                    // Optionally, hide the sow data edit overlay or perform other actions as needed
                    $("#edit_sow_overlay").hide();
                } else {
                    alert("Failed to update sow data. Please try again.");
                }
            },
            error: function () {
                alert("An error occurred while updating sow data.");
            }
        });
    });
    


$('#search-input').on('input', function () {
    var searchQuery = $(this).val();
    if (searchQuery) {
        $.ajax({
            url: '/search_suggestions/',
            data: { 'search_query': searchQuery },
            dataType: 'json',
            success: function (data) {
                if (data.suggestions.length > 0) {
                    // Clear any previous results
                    $('#search-results').empty();

                    // Iterate over the suggestions
                    data.suggestions.forEach(function (suggestion) {
                        // Create a button for each suggestion
                        var suggestionButton = $('<button class="result-button" style="display: block; width: 100%; border: none; height: 15%; color:#FF7373; padding:1%; background-color:#FFFFFF;"></button>');

                        // Set button text (pig_id)
                        suggestionButton.text(suggestion);

                        // Add a click event handler to the button
                        suggestionButton.click(function () {
                            var pigId = suggestion;
                            // Perform the desired action here
                            
                        });

                        // Append the button to the search results div
                        $('#search-results').append(suggestionButton);
                    });

                    // Show the search results
                    $('#search-results').show();
                } else {
                    // No results, hide the search results
                    $('#search-results').hide();
                }
            }
        });
    } else {
        // Empty search query, hide the search results
        $('#search-results').hide();
    }
});


   // Parse the months and counts data
const monthsData = JSON.parse(document.getElementById("months").textContent);
const countsData = JSON.parse(document.getElementById("counts").textContent);

// Create an array of all months of the year
const allMonths = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Initialize an array to store the counts for each month
const counts = Array(12).fill(0); // Initialize with zeros for all months

// Fill in the counts based on the data you have
monthsData.forEach((monthYear, index) => {
  const [year, month] = monthYear.split('-'); // Split the "YYYY-MM" format
  const monthIndex = parseInt(month, 10) - 1; // Adjust for 0-based indexing
  if (!isNaN(monthIndex)) {
    counts[monthIndex] = countsData[index];
  }
});

console.log("Counts:", counts);

// Create a bar chart using the data
const ctx = document.getElementById("pigBarChart").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: allMonths,
    datasets: [
      {
        label: "Pig Registration Count",
        data: counts,
        backgroundColor: "#FF7373",
        borderColor: "#FF7373   ",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: false,
          text: "Count",
        },
      },
    },
  },
});


});
    


function formatDate(dateString) {
    // Split the input date string into parts
    var dateParts = dateString.split(' ');

    // Ensure we have at least 3 parts (Month, day, year)
    if (dateParts.length >= 3) {
        var month = dateParts[0]; // Month
        var day = dateParts[1].slice(0, -1); // Day (remove the comma)
        var year = dateParts[2]; // Year

        // Map month names to their numerical representation
        var monthMap = {
            'Jan.': '01', 'Feb.': '02', 'Mar.': '03', 'Apr.': '04', 'May.': '05', 'Jun.': '06',
            'Jul.': '07', 'Aug.': '08', 'Sep.': '09', 'Oct.': '10', 'Nov.': '11', 'Dec.': '12'
        };

        // Construct the formatted date
        var formattedDate = year + '-' + monthMap[month] + '-' + day;

        return formattedDate;
    }

    // Return an empty string if the date string format is not as expected
    return '';

}

    
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
document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.dropdown_dots');

    buttons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the click event from propagating to the document
            var dropdown = this.nextElementSibling;
            console.log("Dropdown Clicked. Dropdown:", dropdown);
            
            // Toggle the dropdown's display
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            } else {
                dropdown.style.display = 'block';
            }
        });
    });

    // Add a click event listener to the document to close the dropdown when clicking outside of it
    document.addEventListener('click', function(event) {
        var dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(function(dropdown) {
            dropdown.style.display = 'none';
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    var totalPigs = parseInt(document.getElementById("totalPigs").textContent);
    var vaccinatedPigs = parseInt(document.getElementById("vaccinatedPigs").textContent);
  
    var percentageVaccinated = (vaccinatedPigs / totalPigs) * 100;
  
    var ctx = document.getElementById('vaccinationProgress').getContext('2d');
  
    var data = {
      datasets: [{
        data: [percentageVaccinated, 100 - percentageVaccinated],
        backgroundColor: ['#FF7373', '#FBCACA'],
      }],
      labels: ['Vaccinated', 'Remaining'],
    };
  
    new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: false,
        cutout: '65%',
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (context) {
                var label = context.label || '';
                var value = context.parsed || 0;
                return label + ': ' + value.toFixed(2) + '%';
              },
            },
          },
        },
      },
    });
    
  });


  document.addEventListener("DOMContentLoaded", function () {
    var saleMonthsData = JSON.parse(document.getElementById("saleMonths").textContent);
    var saleCountsData = JSON.parse(document.getElementById("salesData").textContent);
  
    // Create an array of all months of the year
    const allMonths = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    // Initialize an array to store the counts for each month
    const counts = Array(12).fill(0);
  
    // Map sale months to the correct index in the counts array
    saleMonthsData.forEach((monthYear, index) => {
      const [year, month] = monthYear.split('-');
      const monthIndex = parseInt(month, 10) - 1;
      if (!isNaN(monthIndex)) {
        counts[monthIndex] = saleCountsData[index];
      }
    });
  
    // Create an array to store the labels for the line chart
    const labels = allMonths;
  
    // Create the line chart
    var ctx = document.getElementById('salesLineChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Monthly Sales',
            data: counts,
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Count',
            },
          },
        },
      },
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    var mortalityDatesData = JSON.parse(document.getElementById("mortalityDates").textContent);
    var mortalityCountsData = JSON.parse(document.getElementById("mortalityData").textContent);

    // Create an array of all months of the year
    const allMonths = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Initialize an array to store the counts for each month
    const counts = Array(12).fill(0);

    // Map mortality data to the correct index in the counts array
    mortalityDatesData.forEach((monthYear, index) => {
        const [year, month] = monthYear.split('-');
        const monthIndex = parseInt(month, 10) - 1;
        if (!isNaN(monthIndex)) {
            counts[monthIndex] = mortalityCountsData[index];
        }
    });

    // Create an array to store the labels for the line chart
    const labels = allMonths;

    // Create the line chart for mortality data
    var ctx = document.getElementById('mortalityAreaChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Mortality Count',
                    data: counts,
                    fill: true,
                    borderColor: '#F7D355',
                    backgroundColor: '#F7D355',
                },
            ],
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Month',
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: false,
                        text: 'Count',
                    },
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var totalWeanlings = parseInt(document.getElementById("totalWeanlings").textContent);
    var weanlingsData = JSON.parse(document.getElementById("weanlingsData").textContent);
    var progressPercentage = (weanlingsData / totalWeanlings) * 100;

    var ctx = document.getElementById('weanlingsProgressBar').getContext('2d');

    var data = {
        labels: ['Weanlings'],
        datasets: [{
            label: 'Progress',
            data: [progressPercentage],
            backgroundColor: ['#FF7373'],
        }],
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: false,
            indexAxis: 'y', // Set indexAxis to 'y' for a horizontal progress bar
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    display: false,
                },
            },
           
        },
    });
});


document.addEventListener("DOMContentLoaded", function () {
    var weightsData = JSON.parse(document.getElementById("average_weights").textContent);

    // Initialize arrays to store the months and weights
    var months = [];
    var weights = [];

    // Extract the month and average weight data from the JSON
    for (var key in weightsData) {
        if (weightsData.hasOwnProperty(key)) {
            months.push(key);
            weights.push(weightsData[key]);
        }
    }

    // Create an array of all months of the year
    const allMonths = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Initialize an array to store the average weights for each month
    const formattedWeights = Array(12).fill(0);

    // Map weights to the correct index in the formattedWeights array
    months.forEach((month) => {
        const [year, monthIndex] = month.split('-');
        const index = parseInt(monthIndex, 10) - 1;
        if (!isNaN(index)) {
            formattedWeights[index] = weights[months.indexOf(month)];
        }
    });

    // Create an array to store the labels for the bar chart
    const labels = allMonths;

    // Create the bar chart
    var ctx = document.getElementById('weightBarChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Average Weights(KG)',
                    data: formattedWeights,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                x: {    
                    title: {
                        display: true,
                        text: 'Month',
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Average Weight',
                    },
                },
            },
        },
    });
});
document.addEventListener("DOMContentLoaded", function () {
    var data = JSON.parse(document.getElementById("quantity_by_ration_data").textContent.replace(/'/g, '"'));

    var rationLabels = Object.keys(data);
    var quantityData = Object.values(data);

    var ctx = document.getElementById('pieChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: rationLabels,
            datasets: [{
                data: quantityData,
                backgroundColor: [
                    '#FDE387',
                    '#659D60',
                    '#FF7373',
                    '#127BBE',
                    // Add more colors if you have more rations
                ],
            }],
        },
        options: {
            responsive: true,
        },
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var expensesData = JSON.parse(document.getElementById("feed_expenses_dates").textContent);
    var costsData = JSON.parse(document.getElementById("feed_expenses_costs").textContent);

    var expensesByMonth = {};

    expensesData.forEach(function (date, index) {
        var monthYear = new Date(date).toLocaleString('default', { month: 'short' }) + ' ' + new Date(date).getFullYear();
        if (expensesByMonth[monthYear] === undefined) {
            expensesByMonth[monthYear] = costsData[index];
        } else {
            expensesByMonth[monthYear] += costsData[index];
        }
    });

    // Create an array with all months of the year
    const allMonths = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    var months = allMonths.map(function (month) {
        // Check if the month exists in the data, if not, set the expense to 0
        var monthYear = month + ' ' + new Date().getFullYear();
        return expensesByMonth[monthYear] || 0;
    });

    var ctx = document.getElementById('expensesBarChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: allMonths,
            datasets: [{
                label: 'Monthly Expenses (₱)',
                data: months,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }],
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Month',
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Monthly Expenses (₱)',
                    },
                },
            },
        },
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Get the values from the Django template
    var vaccineCountsDict = JSON.parse(document.getElementById("vaccine_counts_dict").textContent);
    var totalPigs = parseInt(document.getElementById("totalPigs").textContent);

    // Calculate the percentages for each vaccine count
    var percentages = {};
    for (var key in vaccineCountsDict) {
        percentages[key] = ((vaccineCountsDict[key] / totalPigs) * 100).toFixed(2);
    }

    // Separate the vaccine names and percentage counts into arrays
    var vaccineNames = Object.keys(percentages);
    var percentageCounts = Object.values(percentages);

    // Define an array of colors
    var colors = ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'];
    // Add more colors as needed

    // Create the labels for the bar chart (vaccine names)
    var labels = vaccineNames;

    // Create the bar chart
    var ctx = document.getElementById('vaccine_counts_chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Percentage of Vaccinated Pigs',
                data: percentageCounts,
                backgroundColor: colors, 
                borderColor: colors, 
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Percentage (%)'
                    },
                    suggestedMin: 0, // Set the minimum value for the x-axis
                    suggestedMax: 100, // Set the maximum value for the x-axis
                },
                y: {
                    beginAtZero: true,
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.dataset.label + ' ' + context.parsed.x + '%';
                        }
                    }
                }
            }
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Get the values from the Django template
    var unvaccinatedCountsDict = JSON.parse(document.getElementById("unvaccinated_counts").textContent);
    var vaccineNeededDict = JSON.parse(document.getElementById("vaccine_needed").textContent);

    // Extract data from dictionaries
    var unvaccinatedCounts = Object.values(unvaccinatedCountsDict);
    var vaccineNeededCounts = Object.values(vaccineNeededDict);
    var labels = Object.keys(unvaccinatedCountsDict); 

    // Create the bar chart
    var ctx = document.getElementById('vaccine_needed_bar_chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Unvaccinated Counts',
                    data: unvaccinatedCounts,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Vaccine Needed',
                    data: vaccineNeededCounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});




document.addEventListener("DOMContentLoaded", function () {
    // Get references to the button and overlay elements
    var buttons = document.querySelectorAll(".sow_perf_button");
    var overlay = document.getElementById("sow_perf_overlay");
    var dataContainer = overlay.querySelector(".sow-performance-data");
    var closeButton = document.getElementById("closeButton"); // Move closeButton declaration here

    // Add a click event listener to all the buttons
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            // Extract the sow_id from the button's data attribute
            var sowId = button.getAttribute("data-sow-id");
            console.log(sowId);
            // AJAX request to fetch sow performance data
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/get_sow_performance_data/" + sowId + "/");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var response = JSON.parse(xhr.responseText);
                        var sowData = response.sow_perf_data_list; // Use the correct key

                        // Check for an empty response (no data found)
                        if (response.success && sowData && sowData.length > 0) {
                            // Clear the "No data found" message
                            dataContainer.innerHTML = "";

                            // Extract pig_id from the first sow performance
                            var pigId = sowData[0].pig_id;

                            // Create HTML content for sow performance data
                            var htmlContent = "Pig ID: " + pigId + "<br><br>";
                            dataContainer.innerHTML = htmlContent;

                            // Create the pie chart
                            var chartCanvas = document.createElement('canvas');
                            chartCanvas.id = 'myPieChart';
                            dataContainer.appendChild(chartCanvas);

                            var combinedData = {
                                alive: 0,
                                mk: 0,
                                sb: 0,
                                mffd: 0
                            };

                            sowData.forEach(function (sow) {
                                combinedData.alive += sow.alive;
                                combinedData.mk += sow.mk;
                                combinedData.sb += sow.sb;
                                combinedData.mffd += sow.mffd;
                            });

                            var pieChart = new Chart(document.getElementById('myPieChart'), {
                                type: 'pie',
                                data: {
                                    labels: ['Alive', 'MK', 'SB', 'Mffd'],
                                    datasets: [{
                                        data: [combinedData.alive, combinedData.mk, combinedData.sb, combinedData.mffd],
                                        backgroundColor: ['#FDE387', '#659D60', '#FF7373', '#127BBE'],
                                    }]
                                },
                            });
                        } else {
                            dataContainer.innerHTML = "No sow performance data found.";
                        }
                    } else {
                        console.log("Error: Failed to fetch data. Status code: " + xhr.status);
                        // Display "No sow performance data found" in the HTML when there's an error
                        dataContainer.innerHTML = "No sow performance data found.";
                    }

                    // Show the overlay
                    overlay.style.display = "block";
                }
            };
            xhr.send();
        });
    });

    // Add a click event listener to the close button
    closeButton.addEventListener("click", function () {
        overlay.style.display = "none";
    });
});
