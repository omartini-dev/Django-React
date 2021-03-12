from django.shortcuts import render
from rest_framework import viewsets, generics, mixins
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.views import generic
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import *
from django.db.models import Q
from django.db.models import Count,Sum
from django.contrib.auth.models import User
from myuser.models import UserProfile
def index(request):
    return render(request, 'index.html', {})

def room(request, room_name):
    return render(request, 'room.html', {
        'room_name': room_name
    })

class ChatViewSet(viewsets.ModelViewSet):
    """
        create, update, delete
        GET, POST, PUT, PATCH, DELETE
    """
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['sender', 'listener']
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        queryset = Chat.objects.all().order_by('-created_at')
        sender = self.request.query_params.get('sender', None)
        listener = self.request.query_params.get('listener', None)
        if sender is not None and listener is not None:
            queryset = queryset.filter(Q(sender = sender, listener=listener)|Q(sender = listener, listener=sender))
        
        return queryset

@api_view()
def listuser(request):
    sender = request.query_params.get('sender', None)
    usernames = []
    queryset = Chat.objects.all()
    if sender is not None:
        queryset = Chat.objects.filter(Q(sender=sender) | Q(listener=sender)).values('listener_id', 'sender_id').annotate(dcount=Count('listener_id'), flagcount=Sum('flag'))
        users = []
        tmp = []
        for chat in queryset:
            if chat['listener_id']==int(sender):
                userId = chat['sender_id']
            else:
                userId = chat['listener_id']
            if userId in tmp:
                continue
            tmp.append(userId)
            users.append([User.objects.get(id=userId), UserProfile.objects.get(user_id=userId), chat['dcount']-chat['flagcount']])

        usernames = [{'id':user[0].id, 'first_name':user[0].first_name, 'last_name':user[0].last_name, 'avatar':str(user[1].avatar), 'unread':user[2], 'company_name':user[1].company_name} for user in users]

    return Response(usernames)
