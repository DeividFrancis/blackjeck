import os
import random

class Blackjack(object):


    def __init__(self):
        self.deck = Deck().get_deck()

    def deal(self):
        hand = []
        for i in range(2):
            random.shuffle(self.deck)
            card = self.deck.pop()
            hand.append(card)
        return hand

    def play_again(self):
        again = input("Do you want to play again? (Y/N) : ").lower()
        if again == "y":
            dealer_hand = []
            player_hand = []
            self.deck = [1,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]*4
            # self.game()
        else:
            print( "Bye!")
            exit()

    def total(self,hand):
        total = 0
        for card in hand:
            if card == "J" or card == "Q" or card == "K":
                total+= 10
            elif card == "A":
                if total >= 11: total+= 1
                else: total+= 11
            else:
                total += card
        return total

    def hit(self,hand):
        card = self.deck.pop()
        hand.append(card)
        return hand

    def clear(self):
        if os.name == 'nt':
            os.system('CLS')
        if os.name == 'posix':
            os.system('clear')

    def print_results(self,dealer_hand, player_hand):
        self.clear()
        print( "The dealer has a " + str(dealer_hand) + " for a total of " + str(self.total(dealer_hand)))
        print( "You have a " + str(player_hand) + " for a total of " + str(self.total(player_hand)))

    def blackjack(self,dealer_hand, player_hand):
        if self.total(player_hand) == 21:
            self.print_results(dealer_hand, player_hand)
            print( "Congratulations! You got a Blackjack!\n")
            self.play_again()
        elif self.total(dealer_hand) == 21:
            self.print_results(dealer_hand, player_hand)		
            print( "Sorry, you lose. The dealer got a blackjack.\n")
            # self.seplay_again()

    def score(self,dealer_hand, player_hand):
        if self.total(player_hand) == 21:
            self.print_results(dealer_hand, player_hand)
            print( "Congratulations! You got a Blackjack!\n")
        elif self.total(dealer_hand) == 21:
            self.print_results(dealer_hand, player_hand)		
            print( "Sorry, you lose. The dealer got a blackjack.\n")
        elif self.total(player_hand) > 21:
            self.print_results(dealer_hand, player_hand)
            print( "Sorry. You busted. You lose.\n")
        elif self.total(dealer_hand) > 21:
            self.print_results(dealer_hand, player_hand)			   
            print( "Dealer busts. You win!\n")
        elif self.total(player_hand) < self.total(dealer_hand):
            self.print_results(dealer_hand, player_hand)
            # print( "Sorry. Your score isn't higher than the dealer. You lose.\n")
        elif self.total(player_hand) > self.total(dealer_hand):
            self.print_results(dealer_hand, player_hand)			   
            print( "Congratulations. Your score is higher than the dealer. You win\n")

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
                if v == "Q": v = 11
                if v == "J": v = 12
                if v == "K": v = 13

                card = {
                    "honor" : h,
                    "name"  : name,
                    "value" : v,
                    "url"   : url
                }
                self.deck.append(card)
    def get_deck(self):
        return self.deck

bj = Blackjack()

print(bj.deal())