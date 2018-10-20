# Natives
import json
from datetime import datetime

# Libs
from flask import Flask, request
from flask_json import FlaskJSON, JsonError, json_response, as_json
from flask_cors import CORS

# Mys
from classe.blackjack import Blackjack, Deck

app = Flask(__name__)
CORS(app)
FlaskJSON(app)

app.config['JSON_ADD_STATUS'] = True


# Game
game = Blackjack()
hand = []
session_bet = 0

@app.route('/')
def index():
    now = datetime.utcnow()
    return json_response(time=now)

@app.route('/deck')
@as_json
def start():
    deck = Deck()
    return deck.get_deck()

@app.route('/bet/<coin>')
@as_json
def bet(coin):
    session_bet = coin
    res = {"message": "Aposta de RS: " + coin + " feita"}
    return res

@app.route('/deal')
@as_json
def deal():
    hand = game.deal()
    return hand

@app.route('/hit')
@as_json
def hit():
    return game.hit(hand)

@app.route('/blackjack/<int:dealer>/<int:player>')
@as_json
def blackjack(dealer,player):
    msg = game.blackjack(dealer,player)
    res = {}
    return res

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

# $ export FLASK_APP=route.py
# $ export FLASK_DEBUG=1
# $ python -m flask run
#  * Serving Flask app "hello"
#  * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)