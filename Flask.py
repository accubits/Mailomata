from flask import Flask,request,jsonify
from pymongo import MongoClient

client = MongoClient('mongodb://0.0.0.0:27017/')
db=client.mailomata
app = Flask(__name__)
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response
@app.route("/getEmail",methods = ['POST', 'GET'])
def getEmail():
    if request.method == 'POST':
        req = request.form.to_dict(flat=True)
        data_value=db.mailomata_collection.find_one({'send':"0"})
        print data_value
        if data_value is not None:
            data = {
                'success': True,
                'status_code': '200',
                'message': 'Mail fetched',
                'result': data_value['email']
            }
            resp = jsonify(data)
            resp.status_code = 200
        else:
            data = {
                'success': True,
                'status_code': '200',
                'message': 'Mail fetched',
                'result': ''
            }
            resp = jsonify(data)
            resp.status_code = 200
    else:
        data = {
            'success': True,
            'status_code': '412',
            'message': 'Precondition failed',
            'result': []

        }
        resp = jsonify(data)
        resp.status_code = 412

    return resp

@app.route("/sendEmail",methods = ['POST', 'GET'])
def sendEmail():
    if request.method == 'POST':
        req = request.form.to_dict(flat=True)
        db.mailomata_collection.update({'email':req['email']},{'$set':{'send':"1"}})
        data = {
            'success': True,
            'status_code': '200',
            'message': 'Mail fetched',
            'result': req['email']
        }
        resp = jsonify(data)
        resp.status_code = 200
    else:
        data = {
            'success': True,
            'status_code': '412',
            'message': 'Precondition failed',
            'result': []

        }
        resp = jsonify(data)
        resp.status_code = 412

    return resp
if __name__ == '__main__':
    app.run()

