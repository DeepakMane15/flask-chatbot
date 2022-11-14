from email import message
from flask import Flask, render_template, request,jsonify
from flask_cors import CORS, cross_origin
from chat import get_response
from dbConnection import connection
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.get("/")
def index_get():
    return render_template("base.html")



@app.post("/predict")
def predict():
    text = request.get_json().get("message")

    response = get_response(text)
    message = {"answer" : response}
    return jsonify(message)

@app.post("/fetchBusiness")
def fetchBusiness():
    cursor2 = connection()
    user_store = {"ActionFlag" : "FETCH", "BID": 1 }
    a = cursor2.callproc('[CHATBOT_StarterMessages]', [user_store])
    print (a)
    pass


if __name__ == "__main__":
    app.run(debug=True) 