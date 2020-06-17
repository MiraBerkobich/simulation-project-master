"""mira URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from django.views.generic import RedirectView

from scrum.views import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    url(r'^(?!/?static/)(?!/?media/)(?P<path>.*\..*)$',
        RedirectView.as_view(url='/static/%(path)s', permanent=False), name='static'),
    url(r'^$', serve, kwargs={'path': 'index.html'}),
    url(r'^login$', serve, kwargs={'path': 'index.html'}),
    url(r'^register$', serve, kwargs={'path': 'index.html'}),
    url(r'^index$', serve, kwargs={'path': 'index.html'}),
    url(r'^projects$', serve, kwargs={'path': 'index.html'}),
    url(r'^about-project$', serve, kwargs={'path': 'index.html'}),
    url(r'^tasks$', serve, kwargs={'path': 'index.html'}),
    url(r'^questions$', serve, kwargs={'path': 'index.html'}),
    url(r'^client$', serve, kwargs={'path': 'index.html'}),
    url(r'^diary$', serve, kwargs={'path': 'index.html'}),
    url(r'^team$', serve, kwargs={'path': 'index.html'}),
    url(r'^points$', serve, kwargs={'path': 'index.html'}),
    url(r'^rating$', serve, kwargs={'path': 'index.html'}),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)