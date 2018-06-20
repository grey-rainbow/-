
class Info {

    constructor() {
        this.check_list = Info.get_localStorage("check_list");
    }

    interval_check() {
        setInterval(
            () => this.check_list.map(stock => {
            if (Info.check_price(stock))
                Info.show_info(stock);
        }), 20000);

        console.log(advance_info.check_list);
    }

    static get_localStorage(name) {
        if (typeof (Storage) !== "undefined")
            return JSON.parse(localStorage.getItem(name)) || [];
        else
            return Cookies.getJSON(name) || [];
    }

    static set_localStorage(name, value) {
        if (typeof (Storage) !== "undefined")
            localStorage.setItem(name, JSON.stringify(value));
        else
            Cookies.set(name, value, { expires: 365 });
    }

    static check_price(stock) {
        fetch('/stock', {
            body: JSON.stringify({code: stock.stock_id}),
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            redirect: 'follow',
            referrer: 'no-referrer'
        })
            .then(response => response.json())
            .then(res => {
                return Number(res.current_price) * Number(stock.info_type) > Number(stock.stock_price) * Number(stock.info_type);
            })
            .catch(err => {
                console.log(err);
            })
    }

    static show_info(stock) {
        $("#infoModalPopovers_stock_id")[0].innerText = stock.stock_id;
        $("#infoModalPopovers_stock_price")[0].innerText = stock.stock_price;
        $("#infoModalPopovers").modal('show');
    };

}