from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return '<h1>Hello Blackjeck</h1>'

@app.route('/start')
def start():
    return 'Start'

@app.route('/bet/<int:coin>')
def bet(coin):
    return "ddd %d"%coin

@app.route('/hit/<int:card>')
def hit(card):
    return "ddd %d"%card

@app.route('/stend')
def stend():
    return 'stend'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

# $ export FLASK_APP=route.py
# $ export FLASK_DEBUG=1
# $ python -m flask run
#  * Serving Flask app "hello"
#  * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)