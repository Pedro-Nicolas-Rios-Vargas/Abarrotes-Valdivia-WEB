from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserSerializer, RecoveringPassword
from userManager import UserData
from CompanyMailManager import CompanyData
import smtplib
import ssl


# Create your views here.
class LoginValidationView(APIView):
    serializer_class = UserSerializer

    def __init__(self):
        self.user = UserData()
        self.user_data = self.user.user_data

    def post(self, request, format=None):
        dataEntry = self.serializer_class(data=request.data)
        if dataEntry.is_valid():
            usernameEntry = dataEntry.data.get('username')
            passwordEntry = dataEntry.data.get('pwd')
            if (usernameEntry == self.user_data['username']):
                if (passwordEntry == self.user_data['password']):
                    self.user.changeLoggedStatusToTrue()
                    return Response(
                            {'Mensaje': 'Logged In'},
                            status=status.HTTP_200_OK
                            )
                else:
                    return Response(
                            {'Mensaje': 'contraseña incorrecta'},
                            status=status.HTTP_406_NOT_ACCEPTABLE
                            )
            else:
                return Response(
                        {'Mensaje': 'usuario incorrecto'},
                        status=status.HTTP_406_NOT_ACCEPTABLE
                        )


class RecoveringAccess(APIView):
    serializer_class = RecoveringPassword

    def __init__(self):
        self.user = UserData()
        self.user_data = self.user.user_data
        self.company = CompanyData()
        self.company_data = self.company.company_data

    def post(self, request, format=None):
        dataEntry = self.serializer_class(data=request.data)
        if dataEntry.is_valid():
            msg = dataEntry.data.get('msg')
            if msg == 'Neovim<3':

                self.sendMail()

                return Response(
                        {'Mensaje': 'Enviado'},
                        status=status.HTTP_200_OK
                        )
            else:
                return Response(
                        {'Mensaje': 'Mensaje erroneo'},
                        status=status.HTTP_400_BAD_REQUEST
                        )

    def sendMail(self):
        from email.message import EmailMessage

        email_message_bundle = EmailMessage()
        port = 465  # For SSL
        host_email_address = self.company_data['email']  # Sender email
        password = self.company_data['password']  # Password of email
        receiver_email = self.user_data['email']

        message_args = {
                'username': self.user_data['username'],
                'password': self.user_data['password'],
                }
        subject = 'Recuperación de contraseña'

        message = """\
Si usted no solicitó recuperar su información del sistema \
'Abarrotes Valdivia' verifique que nadie haya intentado acceder a este.

        Usuario: {username}
        Contraseña: {password}

Este correo electrónico es enviado de forma automática, por favor, no \
intente responder a este mensaje.
""".format(**message_args)

        # Create a secure SSL context

        email_message_bundle.set_content(message)
        email_message_bundle['To'] = receiver_email
        email_message_bundle['From'] = host_email_address
        email_message_bundle['Subject'] = subject 
        context = ssl.create_default_context()

        with smtplib.SMTP_SSL("smtp.gmail.com", port,
                              context=context) as server:

            server.login(host_email_address, password)
            server.send_message(email_message_bundle)
            # server.sendmail(host_email_address, receiver_email,
            #                 email_message_bundle)
