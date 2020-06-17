from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Project(models.Model):
    name = models.CharField('Название', max_length=250)
    description = models.TextField('Описание')
    budget = models.PositiveIntegerField('Бюджет', default=0)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'


class Category(models.Model):
    name = models.CharField('Название', max_length=250)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class Task(models.Model):
    name = models.CharField('Название', max_length=250)
    category = models.ForeignKey(Category, verbose_name="Категория", blank=True, null=True, on_delete=models.SET_NULL)
    description = models.TextField('Описание')
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    active = models.BooleanField('Задача изначально неактивна', default=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'


COMPLEXITY = (
    (1, '1'),
    (2, '2'),
    (3, '3'),
)


class Question(models.Model):
    desc = models.TextField('Описание вопроса')
    help = models.TextField('Подсказка для студента', null=True, blank=True)
    active = models.BooleanField('Активен изначально', default=True)
    team = models.BooleanField('Вопрос от команды', default=False)
    client = models.BooleanField('Вопрос от клиента', default=False)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='questions', null=True, blank=True,
                             verbose_name='Задача')
    complexity = models.IntegerField('Сложность', choices=COMPLEXITY, default=2)

    def __str__(self):
        return self.desc

    class Meta:
        verbose_name = 'Вопрос'
        verbose_name_plural = 'Вопросы'


class Answer(models.Model):
    text = models.TextField('Вариант ответа')
    correct = models.BooleanField('Правильный', default=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    deadlines = models.IntegerField('Сроки', default=0,
                                    help_text="Влияет на баллы 'Сроки', положительное или отрицательное число")
    budget = models.IntegerField('Бюджет', default=0,
                                 help_text="Влияет на баллы 'Бюджет', положительное или отрицательное число")
    customer = models.IntegerField('Заказчик', default=0,
                                   help_text="Влияет на баллы 'Заказчик', положительное или отрицательное число")
    team = models.IntegerField('Команда', default=0,
                               help_text="Влияет на баллы 'Команда', положительное или отрицательное число")
    quality = models.IntegerField('Качество', default=0,
                                  help_text="Влияет на баллы 'Качество', положительное или отрицательное число")

    def __str__(self):
        return self.text

    class Meta:
        verbose_name = 'Ответ'
        verbose_name_plural = 'Ответы'


DEADLINES = (
    (7, '7'),
    (14, '14'),
    (21, '21'),
)


class Sprint(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    deadline = models.IntegerField(choices=DEADLINES, default=7)


class Diary(models.Model):
    user = models.ForeignKey(User, verbose_name='Пользователь', on_delete=models.CASCADE, null=True, blank=True)
    time = models.DateTimeField(auto_now_add=True)
    task = models.TextField('Задача', null=True, blank=True)
    question = models.TextField('Вопрос')
    answer = models.TextField('Ответ')
    right_answer = models.TextField('Правильный ответ')
    comment = models.TextField('Комментарий', null=True, blank=True)

    def __str__(self):
        return self.answer

    class Meta:
        verbose_name = 'Дневник'
        verbose_name_plural = 'Дневники'
        ordering = ['-time', 'id']


class Rating(models.Model):
    user = models.ForeignKey(User, verbose_name='Пользователь', on_delete=models.CASCADE, null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name = 'Рейтинг'
        verbose_name_plural = 'Рейтинги'
        ordering = ['-rating', 'id', 'user__id']
