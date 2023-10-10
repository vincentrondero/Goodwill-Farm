from django.contrib import admin
from .models import User, Task, Pig, Sow

admin.site.register(Task)
admin.site.register(User)
admin.site.register(Pig)
admin.site.register(Sow)
