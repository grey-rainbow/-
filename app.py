from flask import Flask
from flask import render_template
from flask import url_for
from flask import send_file

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/image/<path:filename>')
def image(filename):
    return send_file('image/%s' % filename)


@app.route('/public/<path:filename>')
def public(filename):
    return send_file('public/%s' % filename)


if __name__ == '__main__':
    app.run()