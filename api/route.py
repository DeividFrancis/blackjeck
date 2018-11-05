# Natives
import json
from datetime import datetime

# Libs
from flask import Flask, request, session
from flask_json import FlaskJSON, JsonError, json_response, as_json
from flask_cors import CORS

# Mys
from classe.blackjack import Blackjack, Deck

SECRET_KEY = 'develop'
app = Flask(__name__)
app.config.from_object(__name__)
CORS(app)
FlaskJSON(app)


app.config['JSON_ADD_STATUS'] = True


# Game
game = Blackjack()
hands = {
    "player-side": {
        "wallet": 0,
        "hand":[],
        "turns": 0
    },
    "dealer-side": {
        "wallet": 0,
        "hand":[],
        "turns": 0
    }
}

@app.route('/')
def index():
    session["name"] = "batata"
    hands['player-side']["hand"] = []
    hands['dealer-side']["hand"] = []
    return session["name"]

@app.route('/reload/deck')
def reload():
    game.reload_deck()


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

@app.route('/deal/<player>')
@as_json
def deal(player):
    hand = game.deal()
    hands[player]["hand"] += hand
    return  hands[player]["hand"]

@app.route('/hit/<player>')
@as_json
def hit(player):
    hit = game.hit()
    hands[player]["hand"].append(hit)
    return hit

@app.route('/total/<player>')
@as_json
def total(player):
    total = game.total(hands[player])
    return total

@app.route('/score')
@as_json
def score():
    dealer = hands["dealer-side"]
    player = hands["player-side"]
    score = game.score(dealer, player)
    return score

@app.route('/wallet')
@as_json
def wallet():
    hands["player-side"]["wallet"] = 5000
    return {"wallet": hands["player-side"]["wallet"]}

@app.route('/blackjack')
@as_json
def blackjack():
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