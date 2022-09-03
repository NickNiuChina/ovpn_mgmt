from django.shortcuts import render
from django.http import HttpResponse
from ovpn import models
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse


def tips(request):
    return render(request, "ovpn/tips.html")

def index(request):
    return render(request, "ovpn/login.html")

def clientStatus(request):
    return render(request, "ovpn/content/clientsStatus.html")

def clientStatusList(request):
    if request.method == "POST":
        start_note = int(request.POST.get('start', 0)) + 1
        draw = int(request.POST.get('draw', 1))
        page_n = int(request.POST.get('length', 20)) #getting page number
        filterlist = models.BossList.objects.values_list('storename','cn', 'ip','changedate', 'expiredate', 'status').order_by('-status', '-ip')[start_note: start_note+10]
        count = models.BossList.objects.count()
        filterCount =  count if count < page_n else page_n

        context = {
            'draw': draw,
            "recordsTotal": count,
            "recordsFiltered": count,  
            "data": list(filterlist)
        }
        print ("Draw ############: %s" %(draw) )
        print ("recordsTotal ############: %s" %(count) )
        print ("Debug ############: %s" %(list(filterlist)) )
        return JsonResponse(context)

def issuecert(request):
    return render(request, "ovpn/content/issueCert.html")

# @csrf_exempt
def issueUpload(request):
    pass

# reqs file page info
def reqFiles(request):
    return render(request, "ovpn/content/reqFilesList.html")

def reqFilesList(request):
    pass

# cert file page infos
def certFiles(request):
    return render(request, "ovpn/content/certFilesList.html", {"foo": "bar"})

def certFilesList(request):
    pass

