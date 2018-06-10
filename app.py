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


@app.route('/log_in')
def log_in():
    return render_template("log_in.html")


@app.route("/buy")
def buy():
    return render_template("buy.html")


@app.route("/sell")
def sell():
    return render_template("sell.html")


@app.route("/cancel")
def cancel():
    return render_template("cancel.html")


@app.route("/change_password")
def change_password():
    return render_template("change_password.html")


#for test


@app.route("/trade_shares", methods=["POST"])
def trade():
    data = request.form.to_dict()
    print(data)
    return jsonify({
        "state":True,
        "transaction_id":"test_transaction_id"
    })


@app.route("/stock_query", methods = ['GET', 'POST'])
def stock_query():
    return render_template("stock_query.html")


@app.route("/account_user_login", methods=["POST"])
def fund_acc():
    return jsonify({
        "state" : True
    })


@app.route("/stock", methods=["POST","GET"])
def stock():
    method = request.form["method"]
    info = request.form["info"]
    print(method)
    print(info)
    if info =="1234":
        return jsonify({
            "stock_price":{
                "current_price": 11.1, #//实时价格
                "latest_price": 10, #//最新成交价格
                "buy_highest_price": 12,  #//当前购买指令的最高价格
                "sale_lowest_price": 4, #//当前出售的最低价格
                "today_price": { #//当日最高，最低成交价格
                    "highest_price":12,
                    "lowest_price":6,
                },
                "week_price": { #//本周最高，最低成交价格
                    "highest_price":13,
                    "lowest_price":4,
                },
                "month_price": { #//本月最高，最低成交价格
                    "highest_price":21,
                    "lowest_price":1,
                },
                "stock_info": "！！！明天股票大涨！！！" #//股票的重要公告
            }
        })
    if info =="ZJU":
        return jsonify({
            "stock_price":{
                "current_price": 666, #实时价格
                "latest_price": 666, #最新成交价格
                "buy_highest_price": 666,  #//当前购买指令的最高价格
                "sale_lowest_price": 666, #//当前出售的最低价格
                "today_price": { #//当日最高，最低成交价格
                    "highest_price":666,
                    "lowest_price":666,
                },
                "week_price": { #//本周最高，最低成交价格
                    "highest_price":666,
                    "lowest_price":666,
                },
                "month_price": { #//本月最高，最低成交价格
                    "highest_price":666,
                    "lowest_price":666,
                },
                "stock_info": "！！！明天股票大涨！！！" #//股票的重要公告
            }
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


@app.route("/test")
def test():
    return jsonify({
        "stock_price":{
            "current_price": 11.1, #//实时价格
            "latest_price": 10, #//最新成交价格
            "buy_highest_price": 12,  #//当前购买指令的最高价格
            "sale_lowest_price": 4, #//当前出售的最低价格
            "today_price": { #//当日最高，最低成交价格
                "highest_price":12,
                "lowest_price":6,
            },
            "week_price": { #//本周最高，最低成交价格
                "highest_price":13,
                "lowest_price":4,
            },
            "month_price": { #//本月最高，最低成交价格
                "highest_price":21,
                "lowest_price":1,
            },
            "stock_info": "Test" #//股票的重要公告
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