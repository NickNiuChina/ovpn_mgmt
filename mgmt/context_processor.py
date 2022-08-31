# from django.conf import settings
import datetime

def globalVariable (request):
    """
    Global variables
    """
    currentYear = datetime.datetime.now().year

    gvariables = {
        "currentYear": currentYear,
    }
    return gvariables