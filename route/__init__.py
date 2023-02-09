import logging
import numpy as np
import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    vec = np.linspace(0,10, 11)
    name = req.params.get('ship')
    if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            ship = req_body.get('ship')

    if name:
        return func.HttpResponse(f"Hello, {name}. This is CaptaIN Hack Sparrow. Test numpy {vec}")
    else:
        return func.HttpResponse(
             "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.",
             status_code=200
        )
