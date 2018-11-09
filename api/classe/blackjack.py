import os
import random

class Blackjack(object):


    def __init__(self):
        self.deck = Deck().get_deck()

    def reload_deck(self):
        self.deck = Deck().get_deck()
        
    def deal(self):
        hand = []
        for i in range(2):
            random.shuffle(self.deck)
            card = self.deck.pop()
            hand.append(card)
        return hand

    def total(self,player):
        total = 0
        for c in player["hand"]:
            card = c["name"][:1]
            if card == "J" or card == "Q" or card == "K":
                total+= 10
            elif card == "A":
                if total >= 11: total+= 1
                else: total+= 11
            else:
                total += c["value"]
        return total

    def hit(self):
        card = self.deck.pop()
        return card

    def clear(self):
        if os.name == 'nt':
            os.system('CLS')
        if os.name == 'posix':
            os.system('clear')

    def print_results(self,dealer_hand, player_hand):
        dealer_values = []
        for v in dealer_hand["hand"]:
            dealer_values.append(v['value'])

        player_values = []
        for v in dealer_hand["hand"]:
            player_values.append(v['value'])

        dealer_result = "The dealer has a " + str(dealer_values) + " for a total of " + str(self.total(dealer_hand))
        player_result = "You have a " + str(player_values) + " for a total of " + str(self.total(player_hand))
        return {"dealer_result": dealer_result, "player_result": player_result}

    def blackjack(self,dealer_hand, player_hand):
        msg = "continue"
        result = ""
        if self.total(player_hand) == 21:
            result = self.print_results(dealer_hand, player_hand)
            msg = "Congratulations! You got a Blackjack!"

        elif self.total(dealer_hand) == 21:
            result = self.print_results(dealer_hand, player_hand)		
            msg = "Sorry, you lose. The dealer got a blackjack."
        return {"message": msg, "result" : result}

    def score(self,dealer_hand, player_hand):
        player_result = ""
        player_score = ""
        if self.total(player_hand) == 21:
            player_result = self.print_results(dealer_hand, player_hand)
            player_score = "Congratulations! You got a Blackjack!"

        elif self.total(dealer_hand) == 21:
            player_result = self.print_results(dealer_hand, player_hand)		
            player_score = "Sorry, you lose. The dealer got a blackjack."

        elif self.total(player_hand) > 21:
            player_result = self.print_results(dealer_hand, player_hand)
            player_score = "Sorry. You busted. You lose."

        elif self.total(dealer_hand) > 21:
            player_result = self.print_results(dealer_hand, player_hand)			   
            player_score = "Dealer busts. You win!"

        elif self.total(player_hand) < self.total(dealer_hand):
            player_result = self.print_results(dealer_hand, player_hand)
            player_score = "Sorry. Your score isn't higher than the dealer. You lose."

        elif self.total(player_hand) > self.total(dealer_hand):
            player_result = self.print_results(dealer_hand, player_hand)			   
            player_score = "Congratulations. Your score is higher than the dealer. You win."
        return {
            "player_score": player_score,
            "player_result": player_result
        }

class Deck(object):
    def __init__(self):
        values = [
            "As",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "Queen",
            "Jack",
            "King"
        ]
        honors = [
            "Clubs",
            "Diamond",
            "Heart",
            "Spade"
            ]

        self.deck = []
        for h in honors:
            for v in values:
                name = v # Quarda o nome literal
                v = v[:1] # Pega somente o primeiro caractere
                url = v + h[:1] + ".png" # Monta o link da imagem
                if v == "A": v = 1 
                if v == "Q": v = 10
                if v == "J": v = 10
                if v == "K": v = 10
                if v == "1": v = 10 # Gambiarra pq tem um substring e pega somente 1 da carta 10
                
                if(type(v) is str):
                    v = int(v)

                card = {
                    "honor" : h,
                    "name"  : name,
                    "value" : v,
                    "url"   : url
                }
                self.deck.append(card)
    def get_deck(self):
        return self.deck

class Person(object):
    def __init(self):
        self.wallet = None
        self.hand = None
        self.score = None
        pass
    


bj = Blackjack()

print(bj.deal())