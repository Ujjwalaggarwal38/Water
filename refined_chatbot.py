import google.generativeai as ai

API_KEY = 'AIzaSyAIrsKA36127KwQOMpvpribPiLc2NGxEZc'
ai.configure(api_key=API_KEY)

water_footprint_keywords = ["what is water","hi","you","its","calculate","waterfootprint",
    "water footprint", "water usage", "water consumption", "blue water", 
    "green water", "grey water", "water conservation", "agriculture water usage", 
    "industry water usage", "personal water usage", "water-saving", "water scarcity"
]

def is_water_footprint_related(message):
    message_lower = message.lower()
    return any(keyword in message_lower for keyword in water_footprint_keywords)


try:
    model = ai.GenerativeModel("gemini-pro")
    chat = model.start_chat()

    while True:
        message = input('You: ')
        if message.lower() == 'bye':
            print('Chatbot: Goodbye!')
            break
        
        # Check if the message is related to water footprint
        if is_water_footprint_related(message):
            response = chat.send_message(message)
            print('Chatbot:', response.text)
        else:
            print('Chatbot: I can only answer questions related to water footprint.')

except Exception as e:
    print(f"Error occurred: {e}")
