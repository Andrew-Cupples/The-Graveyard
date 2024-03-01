import mapKnowledge as bk
from mapKnowledge import board

def doActions():
    pass

def rankBonuses(incomeOverEntryMult, ntMult):
    rankedBonusList = [len(board.bonusList)]

    for i in range(len(board.bonusList)):
        currentBonus = board.bonusList[i]
        bonusValue = ((currentBonus.income / currentBonus.entryPoints) * incomeOverEntryMult)  - currentBonus.numTerritories * ntMult
        rankedBonusList[i] = bonusValue

    return rankedBonusList

def determineWhoIsStrongestForEachBonus():
    strongestForEach = [len(board.bonusList)][len(board.playerList)]

    # for each bonus in bonus list, determine who is strongest for it
    for i in range(len(board.bonusList)):
        currentBonus = board.bonusList[i]
        

        # for each bonus, loop through the player list and see who is the strongest for it
        territoryList = currentBonus.territoryList
        for j in range(len(board.playerList)):
            currentPlayersTroopsNearBonus = 0

            for k in range(len(territoryList)):
                if territoryList[k].getOwner() == board.playerList[j].name:
                    currentPlayersTroopsInBonus += territoryList[k].getTroopCount()
                for l in range(len(territoryList[k].borderLands)):
                    if territoryList[k].borderLands[l].getOwner() == board.playerList[j].name:
                        currentPlayersTroopsInBonus += territoryList[k].borderLands[l].getTroopCount()
            
            # now that you have the troops you need to rank them based on size and add them to the 2D list
                        

    return 0



def determineTroopsNeededToTake(bonus):
    troopsNeeded = 0


def determineBestAttainableBonus():
    pass

def rankEnemyStrength(tcMult, incMult, tMult):
    enemyStrengthList = [board.playerCount]

    # weights for strength
    for i in range(board.playerCount):
        currentPlayer = board.playerList[i]
        enemyStrengthList[i] = currentPlayer.troopCount * tcMult + currentPlayer.income * incMult * currentPlayer.territoryCount * tMult

    return enemyStrengthList
