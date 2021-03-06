"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.contrib import admin
from django.urls import path
from django.urls.conf import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cliente/', include('cliente.urls')),
    path('', include("frontend.urls")),
    path('login/', include("login.urls")),
    path('logout/', include("logout.urls")),
    path('proveedor/', include('proveedor.urls')),
    path('producto/', include('producto.urls')),
    path('buyRecord/', include('buyRecord.urls')),
    path('sellRecord/', include('sellRecord.urls')),
    path('sellLog/', include('sellLog.urls')),
    path('buyLog/', include('BuyLog.urls')),
    path('cuenta/', include('cuenta.urls')),
    path('socket/', include('socketREST.urls')),
    path('perfil/', include('perfilUsuario.urls')),
]
