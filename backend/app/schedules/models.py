from django.db import models
from django.conf import settings
from activities.models import Activity

class Schedule(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='schedules')
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name='schedules')
    day_of_week = models.IntegerField()  # 0=Monday, 6=Sunday
    start_time = models.TimeField()
    end_time = models.TimeField()
    details = models.TextField(blank=True, null=True)  # Detalhes para dias específicos

    def __str__(self):
        return f"{self.activity.title} on day {self.day_of_week}"
