import json


class CompanyData:
    def __init__(self):
        self.log_path = './companyEmail.json'
        self.company_data = self._getCompanyLog()

    def _getCompanyLog(self):
        data = {}
        with open(self.log_path, 'r') as company_log:
            data = json.load(company_log)

        return data
