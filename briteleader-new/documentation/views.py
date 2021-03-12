from django.shortcuts import render
from rest_framework import permissions
from rest_framework import viewsets, generics, mixins
from rest_framework.views import APIView
from rest_framework.decorators import api_view, action
from .models import *
from .serializers import *
from django.http import HttpResponse
import reportlab
import requests
# Create your views here.
class DocumentationViewSet(viewsets.ModelViewSet):
    """
        create, update, delete
        GET, POST, PUT, PATCH, DELETE
    """
    serializer_class = DocumentationSerializer
    queryset = Documentation.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    @action(detail=True, methods=['get','post', 'patch'])
    def pdfview(self, request, pk):
        user = self.request.user
        purchase = PurchaseList.objects.filter(doc=pk, user=user)
        if purchase:
            doc = Documentation.objects.get(id=pk)
            docdata = self.get_serializer(doc)
            url = docdata.data['file']
            r = requests.get(url)
            response = HttpResponse(content_type='application/pdf')
            # response['Content-Disposition'] = 'attachment; filename="doc.pdf"'
            response.write(r.content)
            return response
        else:
            response.write('failed')
            return response

class PurchaseListViewSet(viewsets.ModelViewSet):
    """
        create, update, delete
        GET, POST, PUT, PATCH, DELETE
    """
    serializer_class = PurchaseListSerializer
    queryset = PurchaseList.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
