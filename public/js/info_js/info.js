"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Info = function () {
    function Info() {
        _classCallCheck(this, Info);

        this.check_list = Info.get_localStorage("check_list");
    }

    _createClass(Info, [{
        key: "interval_check",
        value: function interval_check() {
            var _this = this;

            setInterval(function () {
                return _this.check_list.map(function (stock) {
                    Info.check_price(stock);
                });
            }, 10000);
        }
    }, {
        key: "stop_info",
        value: function stop_info() {
            var stock_id = $("#infoModalPopovers_stock_id")[0].innerText;
            var stock_price = $("#infoModalPopovers_stock_price")[0].innerText;
            var info_type = $("#infoModalPopovers_info_type")[0].innerText === "高于" ? 1 : -1;
            this.check_list = this.check_list.filter(function (x) {
                return !(x.stock_id === stock_id && x.stock_price === stock_price && x.info_type === info_type);
            });
            Info.set_localStorage("check_list", this.check_list);
        }
    }], [{
        key: "get_localStorage",
        value: function get_localStorage(name) {
            if (typeof Storage !== "undefined") return JSON.parse(localStorage.getItem(name)) || [];else return Cookies.getJSON(name) || [];
        }
    }, {
        key: "set_localStorage",
        value: function set_localStorage(name, value) {
            if (typeof Storage !== "undefined") localStorage.setItem(name, JSON.stringify(value));else Cookies.set(name, value, { expires: 365 });
        }
    }, {
        key: "check_price",
        value: function check_price(stock) {
            var _this2 = this;

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "/stock", true);
            xmlhttp.setRequestHeader("Content-type", "application/json");
            xmlhttp.send(JSON.stringify({ code: stock.stock_id }));

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

                    var res = JSON.parse(xmlhttp.responseText);
                    if (Number(res.stock_price.current_price) * Number(stock.info_type) > Number(stock.stock_price) * Number(stock.info_type)) {
                        _this2.show_info(stock);
                    }
                }
            };
        }
    }, {
        key: "show_info",
        value: function show_info(stock) {
            $("#infoModalPopovers_stock_id")[0].innerText = stock.stock_id;
            $("#infoModalPopovers_stock_price")[0].innerText = stock.stock_price;
            $("#infoModalPopovers_info_type")[0].innerText = stock.info_type > 0 ? "高于" : "低于";
            $("#infoModalPopovers").modal('show');
        }
    }]);

    return Info;
}();