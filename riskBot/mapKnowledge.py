import Player
import random

class board():
    
    bonusList = []
    territoryList = []
    playerList = []
    turn = 0
    playerTurn = 0

    def __init__(self, playerNames):
        self.playerCount = len(playerNames)
        for i in range(self.playerCount):
            board.playerList.append(Player.Player(playerNames[i]))
    
    
    def addBonus(self, bonus):
        board.bonusList.append(bonus)
    
    def divideTerritories(self):
        terrCount = len(self.territoryList)
        terrPer = int(terrCount / len(board.playerList))
        for i in range(len(self.territoryList)):
            player = board.playerList[random.randint(0, len(board.playerList) - 1)]
            
            while len(player.territories) >= terrPer:
                player = board.playerList[random.randint(0, len(board.playerList) - 1)]
            
            player.addTerritory(self.territoryList[i])




class territory():
    
    borderLands = []
    def __init__(self, troopCount, id, owner=None):
        self.borderLands = []
        self.owner = owner
        self.troopCount = troopCount
        self.id = id
        board.territoryList.append(self)


    def getTroopCount(self):
        return self.troopCount
    
    def getOwner(self):
        return self.owner
    
    def connectLands(self, land):
        print(f"connecting {land.id} to {self.id}")
        if land not in self.borderLands:
            self.borderLands.append(land)
            land.borderLands.append(self)

    def disconnectLands(self, land):
        print(f"removing {land.id} from {self.id}")
        self.borderLands.remove(land)
        land.borderLands.remove(self)
    
    def getBorderLands(self):
        print(f"border lands for {self.id}")
        for i in range(len(self.borderLands)):
            print(f"{self.id} : {self.borderLands[i].id}")
        return self.borderLands

class bonus():
    def __init__(self, income, numTerritories, entryPoints, territoryList, id):
        self.income = income
        self.numTerritories = numTerritories
        self.entryPoints = entryPoints
        self.territoryList = territoryList
        self.id = id
