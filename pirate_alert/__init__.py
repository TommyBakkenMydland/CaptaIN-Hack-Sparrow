import logging
import numpy as np
import azure.functions as func
import json


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    userID = req.params.get('userID')
    if userID:
        tmp = np.random.random_integers(0,1,2)
        return func.HttpResponse(json.dumps({'danger': int(tmp[0]),'plunder': int(tmp[1])}))
    else:
        return func.HttpResponse(
             "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.",
             status_code=200
        )




