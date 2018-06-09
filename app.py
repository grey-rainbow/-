from flask import Flask
from flask import render_template
from flask import url_for
from flask import send_file
from flask import request, jsonify
import time

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/image/<path:filename>')
def image(filename):
    return send_file('image/%s' % filename)


@app.route('/public/<path:filename>')
def public(filename):
    return send_file('public/%s' % filename)


@app.route('/modules/<path:filename>')
def modules(filename):
    return send_file('modules/%s' % filename)


@app.route('/fonts/<path:filename>')
def fonts(filename):
    return send_file('/public/fonts/%s' % filename)


@app.route('/info')
def info():
    return render_template("info.html")



@app.route("/buy")
def buy():
    return render_template("buy.html")


@app.route("/sell")
def sell():
    return render_template("sell.html")


@app.route("/cancel")
def cancel():
    return render_template("cancel.html")


@app.route("/trade_shares", methods=["POST"])
def trade():
    data = request.form.to_dict()
    print(data)
    return jsonify({
        "state":True,
        "transaction_id":"test_transaction_id"
    })


@app.route("/account_user_login", methods=["POST"])
def fund_acc():
    return jsonify({
        "state" : True
    })


@app.route("/all_transaction")
def all():
    return jsonify({
        "state" : True,
        "message":"",
        "data":{
            "test_tran_id_1":{
                "timestamp" : round(time.time()*1000),
                "stock_id" : "testid123",
                "volume":1234,
                "price" : 5.12,
                "order_type" : 1
            },
            "test_tran_id_2":{
                "timestamp" : round(time.time()*1000),
                "stock_id" : "testid123",
                "volume":1234,
                "price" : 5.12,
                "order_type" : 1
            },
            "test_tran_id_3":{
                "timestamp" : round(time.time()*1000),
                "stock_id" : "testid123",
                "volume":1234,
                "price" : 5.12,
                "order_type" : 1
            },
            "test_tran_id_4":{
                "timestamp" : round(time.time()*1000),
                "stock_id" : "testid123",
                "volume":1234,
                "price" : 5.12,
                "order_type" : 1
            }
        }
    })


@app.route("/transaction_state", methods=["POST"])
def tran_state():
    import random
    return jsonify({
        "state" : True if random.randint(1,2)%2 == 0 else False,
        "msg" : "Test Message."
    })


@app.route("/fund_account", methods=["POST"])
def fun():
    return jsonify({
        "fund"  : 1000,
        "freeze_fund" : 0
    })


if __name__ == '__main__':
    app.run()