from rest_framework import serializers


class Socket:
    def __init__(self, mensaje):
        self.mensaje = mensaje


class SocketSerializer(serializers.Serializer):
    mensaje = serializers.CharField(max_length=15)
