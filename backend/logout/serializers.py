from rest_framework import serializers


class Logout:
    def __init__(self, Logged):
        self.Logged = Logged


class LogoutSerializer(serializers.Serializer):
    Logged = serializers.BooleanField()
