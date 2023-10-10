from django.shortcuts import render, redirect
from django.views import View
from .models import User
from .models import Task
from .models import Pig
from .models import Sow  
from datetime import date, timedelta
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.db import transaction
import json

from datetime import date as today_date, timedelta

def add_pigs(request, user_type):
    context = {
        'user_type': user_type,
    }

    if request.method == 'POST':
        # Handle form submission
        pig_id = request.POST.get("pigID")
        dam = request.POST.get("dam")
        dob = request.POST.get("dob")
        sire = request.POST.get("sire")
        pig_class = request.POST.get("class")
        sex = request.POST.get("sex")
        count = request.POST.get("count")
        weight = request.POST.get("weight")
        remarks = request.POST.get("remarks")
        verif_by = request.POST.get("verifBy")
        birthdate = request.POST.get("date")

        try:
            count = int(count)
            weight = float(weight)
        except (ValueError, TypeError):
            pass

        except ValueError:
            pass

        # Create a Pig object and save it to the database
        pig = Pig(
            pig_id=pig_id,
            dam=dam,
            dob=dob,
            sire=sire,
            pig_class=pig_class,
            sex=sex,
            count=count,
            weight=weight,
            remarks=remarks,
            verif_by=verif_by,
            date=birthdate
        )
        pig.save()

        # Redirect to prevent form resubmission
        return redirect('Add_Pigs', user_type=user_type)

    twenty_eight_days_ago = date.today() - timedelta(days=28)
    eighty_eight_days_ago = date.today() - timedelta(days=88)
    one_fortyeight_days_ago = date.today() - timedelta(days=148)
    pig_list_28_days = Pig.objects.filter(dob__gte=twenty_eight_days_ago)
    pig_list_28_to_88_days = Pig.objects.filter(dob__gte=eighty_eight_days_ago, dob__lt=twenty_eight_days_ago)
    pig_list_88_to_148_days = Pig.objects.filter(dob__gte=one_fortyeight_days_ago, dob__lt=eighty_eight_days_ago)
    pig_list_greater_than_148_days = Pig.objects.filter(dob__lt=one_fortyeight_days_ago)

    pig_list = Pig.objects.all()
    sow_list = Sow.objects.all()
    pig_list_grower = Pig.objects.filter(pig_class='Grower')

    context.update({
        'pig_list_28_days': pig_list_28_days,
        'pig_list_28_to_88_days': pig_list_28_to_88_days,
        'pig_list_88_to_148_days': pig_list_88_to_148_days,
        'pig_list_greater_than_148_days': pig_list_greater_than_148_days,
        'pig_list': pig_list,
        'sow_list': sow_list,
        'pig_list_grower': pig_list_grower,
    })

    return render(request, 'Farm/add_pigs.html', context)


def Login(request):
    return render(request, 'Authentication/Login.html')

def index(request, user_type):
    today = date.today()
    today_tasks = Task.objects.filter(due_date=today)
    checked_tasks = Task.objects.filter(is_done=True)  
    return render(request, 'Farm/index.html', {"today_tasks": today_tasks, "checked_tasks": checked_tasks, "user_type": user_type})

def manage_user(request, user_type):
    if request.method == 'POST':
        # Handle user creation
        firstname = request.POST.get("firstname")
        lastname = request.POST.get("lastname")
        username = request.POST.get("username")
        password = request.POST.get("password")
        role = request.POST.get("role")
        date = request.POST.get("date")

        # If all required fields are provided, create a new User object and save it to the database
        if firstname and lastname and username and password and role and date:
            user = User(
                firstname=firstname,
                lastname=lastname,
                username=username,
                password=password,
                role=role,
                date=date
            )
            user.save()
            
            # Redirect to the same page to prevent form resubmission
            return redirect('manage_user', user_type=user_type)
     # Retrieve a queryset of User objects from your database
    users = User.objects.all()
    users_count = User.objects.filter(role='user').count()

    # Render the manage_user page
    return render(request, 'Farm/manage_user.html', {"users": users,"user_type": user_type, "users_count" :users_count })

from collections import defaultdict
from datetime import datetime

def reports(request, user_type):
    # Fetch Pig data and calculate monthly counts
    pig_data = Pig.objects.all()

    monthly_counts = defaultdict(int)

    for pig in pig_data:
        # Assuming you have a 'registration_date' field in your Pig model
        registration_date = pig.date # Replace with your actual field name

        # Calculate the year and month as a string (e.g., "2023-10")
        year_month = registration_date.strftime("%Y-%m")

        # Increment the count for the corresponding month
        monthly_counts[year_month] += 1

    # Separate the dictionary into lists for months and counts
    months, counts = zip(*monthly_counts.items())

    print("Number of pigs:", len(pig_data))

    # Pass the data to the template context
    context = {
        "user_type": user_type,
        "pig_data":pig_data,
        "months": json.dumps(list(months)),  # Serialize months as JSON
        "counts": json.dumps(list(counts)),
    }

    return render(request, 'Farm/reports.html', context)


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

def delete_user(request, user_type):
    if request.method == 'POST':
        user_id = request.POST.get('id')
        try:
            user = User.objects.get(pk=user_id)
            user.delete()
            return JsonResponse({'success': True})
        except User.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'User not found'})
    return render(request, 'Farm/manage_user.html', { "user_type": user_type, })


def update_user(request, user_type):
    if request.method == 'POST':
        data = request.POST  # Access POST data directly
        user_id = data.get('id')  # Get the user ID from POST data

        try:
            with transaction.atomic():
                user = User.objects.get(pk=user_id)
                user.username = data.get('username')
                user.firstname = data.get('firstname')
                user.lastname = data.get('lastname')
                user.role = data.get('role')
                user.date = data.get('date')
                user.save()

            # Debug: Add print statements or use Django's logging
            print("User updated successfully.")
            
            return JsonResponse({'success': True, 'updated_user': {
                'firstname': user.firstname,
                'lastname': user.lastname,
                'username': user.username,
                'role': user.role,
                'date': user.date,
            }})
        except User.DoesNotExist:
            # Debug: Print error message
            print("User not found.")
            
            return JsonResponse({'success': False, 'error': 'User not found'})
        except Exception as e:
            # Debug: Print error message
            print(f"Error: {str(e)}")
            
            return JsonResponse({'success': False, 'error': str(e)})

    return render(request, 'Farm/manage_user.html', {"user_type": user_type})


def delete_pig(request, user_type, pig_id):
    if request.method == 'POST':
        try:
            pig = Pig.objects.get(id=pig_id)
            pig.delete()
            return JsonResponse({'success': True})
        except Pig.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Pig not found'})

    return JsonResponse({'success': False, 'error': 'Invalid request method'})

def get_pig_data(request, pig_id):
    try:
        # Retrieve the pig data based on pig_id
        pig = Pig.objects.get(pk=pig_id)
        
        # Serialize the pig data into a dictionary
        pig_data = {
            'pig_id': pig.pig_id,
            'dam': pig.dam,
            'dob': pig.dob.strftime('%Y-%m-%d'),  # Format date as string
            'sire': pig.sire,
            'pig_class': pig.pig_class,
            'sex': pig.sex,
            'count': pig.count,
            'weight': str(pig.weight),  # Convert DecimalField to string
            'remarks': pig.remarks,
            # Add more fields as needed
        }
        
        return JsonResponse({'success': True, 'pig_data': pig_data})
    except Pig.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Pig not found'})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)})
    
def update_pig(request, pig_id, user_type):
    if request.method == 'POST':
        data = request.POST  # Access POST data directly

        try:
            with transaction.atomic():
                # Get the pig using the provided pig_id
                pig = Pig.objects.get(pk=pig_id)
                # Update pig data fields based on your form field names
                pig.dam = data.get('dam')
                pig.dob = data.get('dob')
                pig.sire = data.get('sire')
                pig.pig_class = data.get('pig_class')
                pig.sex = data.get('sex')
                pig.count = data.get('count')
                pig.weight = data.get('weight')
                pig.remarks = data.get('remarks')
                # Add more fields as needed
                pig.save()

            # Debug: Add print statements or use Django's logging
            print("Pig updated successfully.")

            # Prepare the updated pig data as a dictionary
            updated_pig_data = {
                'pig_id': pig.pig_id,
                'dam': pig.dam,
                'dob': pig.dob,  # No need for strftime if dob is already in the desired format
                'sire': pig.sire,
                'pig_class': pig.pig_class,
                'sex': pig.sex,
                'count': pig.count,
                'weight': str(pig.weight),  # Convert DecimalField to string
                'remarks': pig.remarks,
                # Add more fields as needed
            }

            return JsonResponse({'success': True, 'updated_pig_data': updated_pig_data})
        except Pig.DoesNotExist:
            # Debug: Print error message
            print("Pig not found.")

            return JsonResponse({'success': False, 'error': 'Pig not found'})
        except Exception as e:
            # Debug: Print error message
            print(f"Error: {str(e)}")

            return JsonResponse({'success': False, 'error': str(e)})

    return render(request, 'Farm/add_pigs.html', {"user_type": user_type})


def add_sow(request, user_type):
    context = {
        'user_type': user_type,
    }

    if request.method == 'POST':
        # Handle form submission
        pig_id = request.POST.get("pig_id")
        dam = request.POST.get("dam")
        dob = request.POST.get("dob")
        sire = request.POST.get("sire")
        pig_class = request.POST.get("pig_class")
        sex = request.POST.get("sex")
        count = request.POST.get("count")
        weight = request.POST.get("weight")
        remarks = request.POST.get("remarks")
        verif_by = request.POST.get("verif_by")
        birthdate = request.POST.get("date")

        try:
            count = int(count)
            weight = float(weight)
        except (ValueError, TypeError):
            pass

        sow = Sow(
            pig_id=pig_id,
            dam=dam,
            dob=dob,
            sire=sire,
            pig_class=pig_class,
            sex=sex,
            count=count,
            weight=weight,
            remarks=remarks,
            verif_by=verif_by,
            date=birthdate
        )
        sow.save()

        sow_list = Sow.objects.all()

        context['sow_list'] = sow_list
        return redirect('Add_Pigs', user_type=user_type)

    return render(request, 'Farm/add_pigs.html', context)

def delete_sow(request, user_type, sow_id):
    if request.method == 'POST':
        try:
            sow = Sow.objects.get(id=sow_id)  # Get the sow object by ID
            sow.delete()
            return JsonResponse({'success': True})
        except Sow.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Sow not found'})

    return JsonResponse({'success': False, 'error': 'Invalid request method'})