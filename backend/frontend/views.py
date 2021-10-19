from django.shortcuts import render
from django.http import HttpResponseRedirect
from userManager import UserData

# Create your views here.


def index(request, *args, **kwargs):
    user = UserData()
    if (user.isLogged() and request.path != '/' or
            not user.isLogged() and request.path == '/'):
        return render(request, 'frontend/index.html')

    elif user.isLogged() and request.path == '/':
        return HttpResponseRedirect('/home/')

    elif not user.isLogged() and request.path != '/':
        return HttpResponseRedirect('/')

