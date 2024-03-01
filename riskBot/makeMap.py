import mapKnowledge
import Player

def makeMap():
    
    board = mapKnowledge.board(["red", "blue", "green", "yellow"])


    # territories 1-4
    Territory1 = mapKnowledge.territory(1, 1)
    Territory2 = mapKnowledge.territory( 1, 2)
    Territory3 = mapKnowledge.territory(1, 3)
    Territory4 = mapKnowledge.territory(1, 4)
    # 5-8
    Territory5 = mapKnowledge.territory(1, 5)
    Territory6 = mapKnowledge.territory(1, 6)
    Territory7 = mapKnowledge.territory(1, 7)
    Territory8 = mapKnowledge.territory(1, 8)
    # territories 9-12
    Territory9 = mapKnowledge.territory(1, 9)
    Territory10 = mapKnowledge.territory(1, 10)
    Territory11 = mapKnowledge.territory(1, 11)
    Territory12 = mapKnowledge.territory(1, 12)
    # 13-16
    Territory13 = mapKnowledge.territory(1, 13)
    Territory14 = mapKnowledge.territory(1, 14)
    Territory15 = mapKnowledge.territory(1, 15)
    Territory16 = mapKnowledge.territory(1, 16)

    # bonus
    print("make bonus")
    Bonus1 = mapKnowledge.bonus(1, 4, 2, [Territory1, Territory2, Territory3, Territory4], 0)
    Bonus2 = mapKnowledge.bonus(1, 4, 1, [Territory5, Territory6, Territory7, Territory8], 1)
    Bonus3 = mapKnowledge.bonus(1, 4, 3, [Territory9, Territory10, Territory11, Territory12], 2)
    Bonus4 = mapKnowledge.bonus(1, 4, 1, [Territory13, Territory14, Territory15, Territory16], 3)

    board.addBonus(Bonus1)
    board.addBonus(Bonus2)
    board.addBonus(Bonus3)
    board.addBonus(Bonus4)

    print("add Territory")

    Territory1.connectLands(Territory2)
    Territory1.connectLands(Territory3)
    Territory1.connectLands(Territory4)

    Territory3.connectLands(Territory4)
    Territory3.connectLands(Territory9)

    Territory4.connectLands(Territory7)
    
    Territory5.connectLands(Territory6)
    
    Territory6.connectLands(Territory8)
    Territory6.connectLands(Territory7)

    Territory7.connectLands(Territory10)
    Territory7.connectLands(Territory13)

    Territory9.connectLands(Territory10)
    Territory9.connectLands(Territory11)

    Territory10.connectLands(Territory13)
    Territory10.connectLands(Territory12)

    Territory11.connectLands(Territory12)

    Territory12.connectLands(Territory13)

    Territory13.connectLands(Territory14)

    Territory14.connectLands(Territory16)

    Territory15.connectLands(Territory16)


    print(len(board.territoryList))


makeMap()