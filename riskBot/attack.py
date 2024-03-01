import mapKnowledge
from mapKnowledge import board

def getAllPossibleAttacks(player):
    attackableTerritories = []
    for i in range(len(player.territoryList)):

        for k in range(len(player.territoryList[i].borderLands)):

            if(player.territoryList[i].borderLands[k].getOwner() != player.color and player.territoryList[i].troopCount[k] > 1):
                attackableTerritories.append(player.territoryList[i].borderLands[k])

    return attackableTerritories


def getAttackSuccessProbability(attackTerritory, defendTerritory):
    attackers = attackTerritory.troopCount
    defenders = defendTerritory.troopCount
    # find from a map or something? if calculated before hand then thats gucci


def getDefenceSuccessProbability(defendTerritory, attackTerritory):
    pass
