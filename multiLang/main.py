import LLM


llm = LLM.LLM()
responses = llm.multiLangResponse("Write me a story about a dog using a maximum of 10 sentances")
answer = llm.combinationMethod(responses)

# combined response
print(answer)

print("\n\n\n end of multi response")

print(responses[0])