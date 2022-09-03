from django.shortcuts import render
from django.shortcuts import redirect
from django.conf import settings
from django.http import HttpResponse
from pathlib import Path

# Create your views here.

def index(request):
    return redirect('/ovpn')

def test(request):
    home = settings.BASE_DIR.parent
    return HttpResponse("Home: " + str(home))
