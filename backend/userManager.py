import json


class UserData:
    def __init__(self):
        self.log_path = './user.json'
        self.user_data = self._getUserLog()

    def _getUserLog(self):
        user = {}
        with open(self.log_path, 'r') as user_log:
            user = json.load(user_log)

        return user

    def changeLoggedStatusToTrue(self):
        if self.user_data['Logged'] is False:
            self.user_data['Logged'] = True
        else:
            print('Ya era verdadero dx')

        self._register_change()

    def isLogged(self):
        return self.user_data['Logged']

    def changeLoggedStatusToFalse(self):
        if self.user_data['Logged'] is True:
            self.user_data['Logged'] = False
        else:
            print('Ya era falso xd')

        self._register_change()

    def _register_change(self):
        with open(self.log_path, 'w') as user_log:
            json.dump(self.user_data, user_log)
