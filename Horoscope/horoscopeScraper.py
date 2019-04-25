import requests, json, pprint
from bs4 import BeautifulSoup
from os import path
mainlist = []
id = 1
for i in range(12):
    innerdic = {}
    signList = ['Aries', 'Tauras', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
    get = requests.get("https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-tomorrow.aspx?sign="+str(i+1))
    parse = BeautifulSoup(get.text, "html.parser")

    maindiv = parse.find('div', class_ = 'grid grid-right-sidebar')
    maindiv1 = maindiv.find('div', class_ = 'tablet-ad')
    ptag = maindiv1.find('p')
    date = ptag.find('strong', class_ = 'date')
    prediction = ptag.text
    signListData = signList[i]
    innerdic['Sign'] = signListData
    innerdic['Id'] = id
    innerdic['Date'] = date.text
    innerdic['Prediction'] = prediction
    id+=1
    mainlist.append(innerdic)
    
with open('dailyHoroscope.json', 'w') as file:
    horoscopeData = json.dumps(mainlist)
    file.write(horoscopeData)
