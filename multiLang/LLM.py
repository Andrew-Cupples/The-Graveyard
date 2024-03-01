from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import ChatGoogleGenerativeAI
    
# CURRENT API KEY
GOOGLE_API_KEY = ""

# Initiate the LLM
def createLLM():
    return ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=GOOGLE_API_KEY)


class LLM:


    def __init__(self):
        self.model = createLLM()

    # Generate a response from the LLM given a prompt
    def generateResponse(self, prompt): 
        result = self.model.invoke(prompt)
        return result.content
    
    def multiLangResponse(self, prompt, languages):

        translatedResponses = []
        responses = []

        # Generate a response in each language
        for language in languages:
            translatedResponses.append(self.generateResponse(f"translate this '{prompt}' into  {language}"))

        print("Prompts translated")

        for response in translatedResponses:
            responses.append(self.generateResponse(response))

        print("Responses generated")
        for response in responses:
            print(response)

        return responses


    def combinationMethod(self, responses):
        prompt = """I'm going to give you some text that is
            in multiple languages. Combine it intelligently into one text using 
            the best parts of each response: Here is the text"""
        index = 1
        for response in responses:
            prompt += f"{response} end of of response {index}."
        
        return self.generateResponse(prompt)

