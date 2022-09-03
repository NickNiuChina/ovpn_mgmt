from django.shortcuts import render
from django.shortcuts import redirect
from django.conf import settings
from django.http import HttpResponse

# Create your views here.

def index(request):
    return redirect('/ovpn')

def test(request):
    home = settings.BASE_DIR
    return HttpResponse("Home:" + str(home))
