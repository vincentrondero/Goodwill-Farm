from django.urls import path
from .views import LoginView
from . import views

urlpatterns = [
    path('', views.Login, name="Home"),
    path('pigs/<str:user_type>/', views.index, name="Pigs"),
    path('Login/', LoginView.as_view(), name="Login"),
    path('add_pigs/<str:user_type>/', views.add_pigs, name="Add_Pigs"),
    path('manage_user/<str:user_type>/', views.manage_user, name="manage_user"),
    path('reports/<str:user_type>/', views.reports, name="reports"),
    path('set_sched/<str:user_type>/', views.set_sched, name="set_sched"),
    path('data_entry/<str:user_type>/', views.data_entry, name="data_entry"),
    path('get_checkbox_states/', views.get_checkbox_states, name='get_checkbox_states'),
    path('update_task_status/', views.update_task_status, name='update_task_status'),
    path('api/tasks-for-date/<str:selected_date>/', views.tasks_for_date, name='tasks-for-date'),
    path('delete_user/<str:user_type>/', views.delete_user, name='delete_user'),
    path('update_user/<str:user_type>/', views.update_user, name='update_user'),  
]
