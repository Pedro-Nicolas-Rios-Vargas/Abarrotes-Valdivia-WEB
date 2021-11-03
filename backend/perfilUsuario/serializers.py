from rest_framework import serializers


class User:
    def __init__(self, username, pwd, email):
        self.username = username
        self.pwd = pwd
        self.email = email


class UserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=16)
    pwd = serializers.CharField(max_length=16)
    email = serializers.EmailField(max_length=64)


class PwdSerializer(serializers.Serializer):
    pwd = serializers.CharField(max_length=16)
