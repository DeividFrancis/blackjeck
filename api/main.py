from blackjack import Blackjack

if __name__ == "__main__":
    bj = Blackjack()
    choice = 0
    bj.clear()
    print("WELCOME TO BLACKJACK!\n")
    dealer_hand = bj.deal()
    player_hand = bj.deal()
    while choice != "q":
        print( "The dealer is showing a " + str(dealer_hand[0]))
        print( "You have a " + str(player_hand) + " for a total of " + str(bj.total(player_hand)))
        bj.blackjack(dealer_hand, player_hand)
        choice = input("Do you want to [H]it, [S]tand, or [Q]uit: ").lower()
        bj.clear()
        if choice == "h":
            bj.hit(player_hand)
            while bj.total(dealer_hand) < 17:
                bj.hit(dealer_hand)
            bj.score(dealer_hand, player_hand)
            bj.play_again()
        elif choice == "s":
            while bj.total(dealer_hand) < 17:
                bj.hit(dealer_hand)
            bj.score(dealer_hand, player_hand)
            bj.play_again()
        elif choice == "q":
            print("Bye!")
            exit()