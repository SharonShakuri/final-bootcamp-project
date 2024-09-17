import requests
from bs4 import BeautifulSoup
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}
response = requests.get("https://blog.luxurygold.com/best-luxury-hotels-in-the-world/", headers=headers)
webpage = response.content

soup = BeautifulSoup(webpage, "html.parser")

h3_tags = soup.find_all('h3')

hotels = [h3.get_text(strip=True) for h3 in h3_tags]

with open('hotels.json', 'w') as file:
    json.dump(hotels[:10], file)  
print("Hotel names have been successfully saved to 'hotels.json'.")
