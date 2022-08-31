from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path(r'', views.index, name='index'),
    path('tips', views.tips, name='tips'),

    path('clientstatus', views.clientStatus, name='clientstatus'),
    path('clientstatus/list', views.clientStatusList),

    path('issue', views.issuecert),
    path('issue/upload', views.issueUpload),

    path('certed', views.certFiles, name='certFiles'),
    path('certed/list', views.certFilesList, name='certFilesList'),

    path('reqs', views.reqFiles, name='reqFiles'),
    path('reqs/list', views.reqFilesList, name='reqFilesList'),
]