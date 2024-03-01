class Player():

    territoryList = []

    def __init__(self, color):
        self.color = color

    def getTerritories(self):
        return self.territoryList

    def addTerritory(self, territory):
        self.territoryList.append(territory)

    def removeTerritory(self, territory):
        return self.territoryList.remove(territory)