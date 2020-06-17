from django.contrib import admin

from scrum.models import Project, Task, Question, Answer, Diary, Rating


class QuestionInline(admin.TabularInline):
    model = Question


class AnswerInline(admin.TabularInline):
    model = Answer


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    pass


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('desc', 'help', 'active', 'team', 'client', 'task', 'complexity')
    list_editable = ('help', 'active', 'team', 'client', 'task', 'complexity')
    list_filter = ('task',)
    inlines = [AnswerInline, ]


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('text', 'correct', 'question', 'deadlines', 'budget', 'customer', 'team', 'quality')
    list_editable = ('correct', 'question', 'deadlines', 'budget', 'customer', 'team', 'quality')
    list_filter = ('question', )


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    inlines = [QuestionInline, ]


@admin.register(Diary)
class DiaryAdmin(admin.ModelAdmin):
    list_display = ('time', 'user', 'task', 'question', 'answer', 'right_answer', 'comment')
    list_editable = ('comment', )


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('user', 'project', 'rating')
