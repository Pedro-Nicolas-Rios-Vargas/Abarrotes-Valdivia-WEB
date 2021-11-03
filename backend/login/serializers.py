from rest_framework import serializers


class User:
    def __init__(self, username, pwd, email=None, logged=None):
        self.username = username
        self.pwd = pwd
        self.email = email
        self.logged = logged


class UserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    pwd = serializers.CharField(max_length=16)


class RecoveringPassword(serializers.Serializer):
    msg = serializers.CharField(max_length=255)
