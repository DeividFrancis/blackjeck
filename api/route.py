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
hands = {
    "player-side": [],
    "dealer-side": []
}
session_bet = 0

@app.route('/')
def index():
    hands['player-side'] = None
    hands['player-side'] = None

@app.route('/deck')
@as_json
def start():
    deck = Deck()
    return deck.get_deck()

@app.route('/bet/<coin>')
@as_json
def bet(coin):
    res = {"message": "Aposta de RS: " + coin + " feita"}
    return res

@app.route('/deal')
@as_json
def deal():
    hand = game.deal()
    return hand

@app.route('/hit/<player>')
@as_json
def hit(player):
    hit = game.hit()
    hands[player].append(hit)
    return hit

@app.route('/total')
@as_json
def total():
    pass

@app.route('/wallet')
@as_json
def wallet():
    return {"wallet": 5000}

@app.route('/blackjack/<player>/<sum>')
@as_json
def blackjack(player, sum):
    player = hands["player-side"]
    dealer = hands["dealer-side"]

    msg = game.blackjack(dealer,player)
    return msg

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

# $ export FLASK_APP=route.py
# $ export FLASK_DEBUG=1
# $ python -m flask run
#  * Serving Flask app "hello"
#  * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)