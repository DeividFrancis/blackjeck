from flask import Flask
app = Flask(__name__)

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
    app.runn()

# $ env FLASK_APP=route.py flask run
#  * Serving Flask app "hello"
#  * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)