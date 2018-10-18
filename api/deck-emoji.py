# espada = ♠️ 
# ouro   = ♦️
# paus   = ♣️
# copas  = ♥️

naipes = {0:"♦️",1 : "♠️", 2: "♥️", 3:"♣️"}
deck = [1,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]*4

print("""
         _____________
        |             |
        | *********** |
        | *         * |
        | *  python * |
        | *    é    * |
        | *  Lindo  * |
        | *         * |
        | *********** |
        |_____________|
        """)

for naipe in naipes:
    for card in deck:
        if card == 1:card = "A"
        if card == 11:card = "Q"
        if card == 12:card = "J"
        if card == 13:card = "K"

        if card == 10:
            print("""
             _____________
            |             |
            | {0}          |
            | {1}           |
            |             |
            |      {1}      |
            |             |
            |          {0} |
            |           {1} |
            |_____________|
            """.format(card, naipes[naipe]))
        else:
            print("""
             _____________
            |             |
            | {0}           |
            | {1}           |
            |             |
            |      {1}      |
            |             |
            |           {0} |
            |           {1} |
            |_____________|
            """.format(card, naipes[naipe]))
        # exit()