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
    path('delete_pig/<str:user_type>/<int:pig_id>/', views.delete_pig, name='delete_pig'),
    path('update_pig/<int:pig_id>/<str:user_type>/', views.update_pig, name='update_pig'),
    path('get_pig_data/<int:pig_id>/', views.get_pig_data, name='get_pig_data'),
    path('add_sow/<str:user_type>/', views.add_sow, name="add_sow"),
    path('delete_sow/<str:user_type>/<int:sow_id>/', views.delete_sow, name='delete_sow'),
    path('save_feeds_inventory/<str:user_type>/', views.save_feeds_inventory, name='save_feeds_inventory'),
    path('save_pig_sale/<str:user_type>/', views.save_pig_sale, name='save_pig_sale'),
    path('mortality-form/<str:user_type>/', views.mortality_form, name='mortality_form'),
    path('save_vaccine/<str:user_type>/', views.save_vaccine, name='save_vaccine'),
    path('save_weanling/<str:user_type>/', views.save_weanling, name='save_weanling'),
    path('add_sp/<str:user_type>/', views.add_sp, name='add_sp'),
]
