from django.shortcuts import render, redirect
from django.views import View
from .models import User
from .models import Task
from datetime import date
from django.http import JsonResponse
from django.contrib.auth import authenticate, login

def add_pigs(request, user_type):
    return render(request, 'Farm/add_pigs.html',{"user_type": user_type})

def Login(request):
    return render(request, 'Authentication/Login.html')

def index(request, user_type):
    today = date.today()
    today_tasks = Task.objects.filter(due_date=today)
    checked_tasks = Task.objects.filter(is_done=True)  
    return render(request, 'Farm/index.html', {"today_tasks": today_tasks, "checked_tasks": checked_tasks, "user_type": user_type})


def manage_user(request, user_type):
    return render(request, 'Farm/manage_user.html',{"user_type": user_type})

def reports(request, user_type):
    return render(request, 'Farm/reports.html',{"user_type": user_type})

def data_entry(request, user_type):
    return render(request, 'Farm/data_entry.html',{"user_type": user_type})

class LoginView(View):
    template_name = 'Authentication/Login.html'

    def get(self, request):
        # This handles the initial GET request to display the login form.
        return render(request, self.template_name, {"error_message": ""})

    def post(self, request):
        # This handles the POST request when the form is submitted.
        error_message = ""

        # Get the entered username and password from the form
        entered_username = request.POST.get("username")
        entered_password = request.POST.get("password")

        try:
            # Attempt to retrieve a user with the entered username from the database
            user = User.objects.get(username=entered_username)

            # Check if the entered password matches the stored password (in practice, use proper password hashing)
            if entered_password == user.password:
                # Successful login, set a user_type flag based on the role
                if user.role == 'administrator':
                    user_type = 'admin'
                else:
                    user_type = 'user'

                # Print the user_type for debugging
                print("user_type:", user_type)

                # Redirect to a page with the user_type parameter
                return redirect("Pigs", user_type=user_type)
            else:
                # Failed login, set the error message
                error_message = "Invalid password. Please try again."
        except User.DoesNotExist:
            # User with the entered username does not exist, set the error message
            error_message = "User not found. Please try again."

        # Render the login form with the error message
        return render(request, self.template_name, {"error_message": error_message})


from django.views.decorators.csrf import csrf_protect

@csrf_protect
def set_sched(request, user_type):
    if request.method == 'POST':
        # Handle form submission
        task_name = request.POST.get("taskname")
        due_date = request.POST.get("duedate")
        due_time = request.POST.get("duetime")
        description = request.POST.get("desc")
        is_done = request.POST.get("is_done")

        # Convert "on" to True and None to False for is_done
        is_done = is_done == "on"

        # If a task name is provided, create a new Task object and save it to the database
        if task_name:
            task = Task(task_name=task_name, due_date=due_date, due_time=due_time, description=description, is_done=is_done)
            task.save()

            # Redirect to the same page to prevent form resubmission
            return redirect('set_sched', user_type=user_type)

    # Retrieve tasks
    all_tasks = Task.objects.all()
    today = date.today()
    today_tasks = Task.objects.filter(due_date=today)

    # Filter tasks based on their is_done field
    todo_tasks = all_tasks.filter(is_done=False)
    done_tasks = all_tasks.filter(is_done=True)

    return render(request, "Farm/set_sched.html", {"today_tasks": today_tasks, "todo_tasks": todo_tasks, "done_tasks": done_tasks, "user_type": user_type})



def get_checkbox_states(request):
    # Assuming you have a model called Task with an is_done field
    tasks = Task.objects.all()

    # Create a list to store the checkbox states
    checkbox_states = [{'id': task.id, 'is_done': task.is_done} for task in tasks]

    # Debugging statement to check the data before returning
    print("Checkbox States:", checkbox_states)

    # Return the checkbox states as a JSON response with safe=False
    return JsonResponse(checkbox_states, safe=False)


def update_task_status(request):
    if request.method == 'POST':
        task_id = request.POST.get('task_id')
        is_done = request.POST.get('is_done')

        try:
            task = Task.objects.get(id=task_id)
            task.is_done = is_done == 'true'  # Convert the string to a boolean
            task.save()

            # Prepare the task data to include in the response
            task_data = {
                'id': task.id,
                'task_name': task.task_name,
                'is_done': task.is_done,
                # Include any other task-related data you need
            }

            return JsonResponse({'message': 'Task status updated successfully', 'task': task_data})
        except Task.DoesNotExist:
            return JsonResponse({'error': 'Task not found'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
    

def tasks_for_date(request, selected_date):
    # Replace 'Task' with your actual Task model and 'due_date' with the appropriate field name
    tasks_for_selected_date = Task.objects.filter(due_date=selected_date)

    # Format the tasks data as a list of dictionaries
    tasks_data = [
        {
            'id': task.id,
            'task_name': task.task_name,
            'is_done': task.is_done,
            # Include other task data as needed
        }
        for task in tasks_for_selected_date
    ]

    # Return the tasks data as JSON response
    return JsonResponse(tasks_data, safe=False)