from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, generics
from django.views.decorators.csrf import csrf_exempt
from digitalization_api.models import Pdf_upload
from django.http import HttpResponse
from django.http import JsonResponse


# Create your views here.
@csrf_exempt
def upload_file(request):
    if request.method == 'POST':
        print("filedata",request.POST.get('file'))
        print ("request.post",request.POST)
        file = request.FILES['file']

        status_value =  request.POST.get('status')
        file_name = request.POST.get('name')
        print('status_value',status)
        document = Pdf_upload.objects.create(file=file,status= status_value,name=file_name )
        print('document',document)
        return HttpResponse({"status": "success"})
    return HttpResponse ({"status": "success"})

@csrf_exempt
def get_files(request):
    if request.method == 'GET':
        files = Pdf_upload.objects.all().values()
        result =[]
        print("files",files)
        for values in files :
            result.append ({"file":values['file'],"status" :values['status'],"name":values['name']}) 
        print("users",files,"'data",result)
    return JsonResponse(result,safe= False)

@csrf_exempt
def get_invoice(request):
    if request.method == 'GET':
        result ={
            "invoice_number" :123,
            "invoice_date" : "12/12/23",
            "total":200,
            "tax":25,
            "vendor":"digi convert"
        }
    return JsonResponse(result,safe= False)
