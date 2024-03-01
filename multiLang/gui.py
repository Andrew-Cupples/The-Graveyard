from PyQt6.QtWidgets import QCheckBox, QStyleFactory, QMainWindow, QApplication, QWidget, QPushButton, QLabel, QTextEdit, QPlainTextEdit, QTreeView, QStyledItemDelegate
from PyQt6.QtCore import QEvent
from PyQt6.QtGui import QAction, QStandardItemModel, QStandardItem
import LLM
import sys

# This allows you to change the height of the tree items
class CustomDelegate(QStyledItemDelegate):
    def sizeHint(self, option, index):
        size = super().sizeHint(option, index)
        size.setHeight(30)
        size.setWidth(30)
        return size

# Main window
class MainWindow(QMainWindow):

    # initiate the mainwindow
    def __init__(self):
        super().__init__()

        # set the central widget to add a background color
        centralWidget = QWidget(self)
        self.setCentralWidget(centralWidget)
        centralWidget.setStyleSheet("background-color: #344b9e;")
       
        # initiate the AI features
        self.init_aiPage()
        # initiate the LLM
        self.llm = LLM.LLM()

            
    # initiate the page
    def init_aiPage(self):
        self.setWindowTitle('Multi-Language AI')
        self.setGeometry(600, 35, 800, 600)

        # these help make the UI line up correctly
        xShelf = 10
        yShelf = 40

        yShelf += 40
        # multi Output area
        self.multiLabel = QLabel(self)
        self.multiLabel.setText("Multi Output")
        self.multiLabel.setGeometry(xShelf, yShelf - 40, 140, 40)
        self.multiLabel.setStyleSheet("font-size: 20px;")
        self.multiOutputArea = QTextEdit(self)
        self.multiOutputArea.setGeometry(xShelf, yShelf, 380, 400)
        self.multiOutputArea.setReadOnly(True)
        self.multiOutputArea.setText("M")

        xShelf += 400
        # regular Output area
        self.regularLabel = QLabel(self)
        self.regularLabel.setText("Normal")
        self.regularLabel.setGeometry(xShelf, yShelf - 40, 100, 40)
        self.regularLabel.setStyleSheet("font-size: 20px;")
        self.regularOutputArea = QTextEdit(self)
        self.regularOutputArea.setGeometry(xShelf, yShelf, 380, 400)
        self.regularOutputArea.setReadOnly(True)
        self.regularOutputArea.setText("R")

        self.multiOutputArea.setStyleSheet("font-size: 20px; background-color: #f0f5f5;")
        self.regularOutputArea.setStyleSheet("font-size: 20px; background-color: #f0f5f5;")

        yShelf += 410
        xShelf -= 400
        # User prompt area
        self.UserInputArea = QPlainTextEdit(self)
        self.UserInputArea.setPlaceholderText("Enter prompt")
        self.UserInputArea.installEventFilter(self)
        self.UserInputArea.setGeometry(xShelf, yShelf, 625, 40)
        self.UserInputArea.setStyleSheet("font-size: 14px; background-color: #f0f5f5;")

        # The enter button
        xShelf += 640
        self.enterButton = QPushButton('Enter', self)
        self.enterButton.setGeometry(xShelf, yShelf, 50, 40)
        self.enterButton.clicked.connect(lambda: self.handlePrompt())
        self.enterButton.setStyleSheet("font-size: 14px; background-color: #f0f5f5;")
        self.enterButton.installEventFilter(self)
        xShelf = 10
        yShelf = 500


        self.englishBox = QPushButton("English", self)
        self.frenchBox = QPushButton("French", self)
        self.germanBox = QPushButton("German", self)
        self.russianBox = QPushButton("Russian", self)
        self.chineseBox = QPushButton("Chinese", self)
        self.hindiBox = QPushButton("Hindi", self)
        self.spanishBox = QPushButton("Spanish", self)
        self.englishBox.setStyleSheet("font-size: 14px; background-color: #f0f5f5;")
        self.frenchBox.setStyleSheet("font-size: 14px; background-color: #f0f5f5;")
        self.germanBox.setStyleSheet("font-size: 14px; background-color: #f0f5f5;")
        self.russianBox.setStyleSheet("font-size: 14px; background-color: #f0f5f5;")
        self.chineseBox.setStyleSheet("font-size: 14px; background-color: #f0f5f5;")
        self.hindiBox.setStyleSheet("font-size: 14px; background-color: #f0f5f5;")
        self.spanishBox.setStyleSheet("font-size: 14px; background-color: #f0f5f5;")

        self.englishBox.setCheckable(True)
        self.frenchBox.setCheckable(True)
        self.germanBox.setCheckable(True)
        self.russianBox.setCheckable(True)
        self.chineseBox.setCheckable(True)
        self.hindiBox.setCheckable(True)
        self.spanishBox.setCheckable(True)

        self.englishBox.setChecked(True)
        self.frenchBox.setChecked(True)
        self.germanBox.setChecked(True)
        self.russianBox.setChecked(True)
        self.chineseBox.setChecked(True)
        self.hindiBox.setChecked(True)
        self.spanishBox.setChecked(True)

        yShelf += 40
        self.englishBox.setGeometry(xShelf, yShelf, 80, 40)
        xShelf += 90
        self.frenchBox.setGeometry(xShelf, yShelf, 80, 40)
        xShelf += 90
        self.germanBox.setGeometry(xShelf, yShelf, 80, 40)
        xShelf += 90
        self.russianBox.setGeometry(xShelf, yShelf, 80, 40)
        xShelf += 90
        self.chineseBox.setGeometry(xShelf, yShelf, 80, 40)
        xShelf += 90
        self.hindiBox.setGeometry(xShelf, yShelf, 80, 40)
        xShelf += 90
        self.spanishBox.setGeometry(xShelf, yShelf, 80, 40)


    # close the application
    def close(self):
        QApplication.instance().quit()

    # Used to get an event
    def eventFilter(self, obj, event):
        if event.type() == QEvent.Type.KeyPress and event.key() == 16777220 and isinstance(obj, QPlainTextEdit):
            self.handlePrompt()
            return True
        return super().eventFilter(obj, event)

    # used to add output to the AI area and allign it vertically
    def addToOutputs(self, originalResponse, multiResponse):
        self.regularOutputArea.setText("R" + originalResponse)
        self.multiOutputArea.setText(multiResponse)

    def handlePrompt(self):

        languages = []

        if self.englishBox.isChecked():
            languages.append("english")
        if self.frenchBox.isChecked():
            languages.append("french")
        if self.germanBox.isChecked():
            languages.append("german")
        if self.russianBox.isChecked():
            languages.append("russian")
        if self.chineseBox.isChecked():
            languages.append("chinese")
        if self.hindiBox.isChecked():
            languages.append("hindi")
        if self.spanishBox.isChecked():
            languages.append("spanish")
        

        responses = self.llm.multiLangResponse(self.UserInputArea.toPlainText(), languages)
        answer = self.llm.combinationMethod(responses)
        print("Responses combined")
        self.addToOutputs(self.llm.generateResponse(self.UserInputArea.toPlainText()), answer)


# initiate everything
if __name__ == '__main__':
    app = QApplication(sys.argv)
    options = QStyleFactory.keys()
    app.setStyle(QStyleFactory.create(options[2]))
    ex = MainWindow()
    ex.show()
    sys.exit(app.exec())