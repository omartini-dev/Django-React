from django.urls import path

from . import views
urlpatterns = [
	path('', views.index),
	path('profile/<int:id>/', views.detail),
	path('signin', views.login),
	path('signup', views.signup),
	path('home', views.home),
	path('companies', views.index),
	path('companyprofile', views.index),
	path('jobs', views.index),
	path('proposal/<int:id>/', views.detail),
	path('postcom', views.index),
	path('postlist',views.index),
	path('postdetail/<int:id>/',views.detail),
	path('article',views.index),
	path('companyedit',views.index),
	path('message/<int:id>',views.detail),
	path('companyedit',views.index),
	path('personedit',views.index),
	path('upgrade',views.index),
	path('document',views.index),
	path('welcome',views.index),
	path('artdetail/<int:id>/',views.detail),
	path('docdetail/<int:id>/',views.detail),
	
	
	
]