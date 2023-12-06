import random
from flask import Flask, jsonify, make_response, redirect, render_template, request, session, url_for
import os;
import pandas as pd;
import openpyxl
import requests;

app = Flask(__name__)

incompletetasks = []
completetasks = []
tmp = []
app.secret_key = 'jason'
skins = []
renegade = ("https://fortnite-api.com/images/cosmetics/br/cid_028_athena_commando_f/featured.png", "Renegade Raider")
peely = ("https://www.pngmart.com/files/22/Fortnite-Peely-PNG-Picture.png", "Peely")
raven = ("https://i.pinimg.com/originals/de/d0/18/ded01845e2de5082ff542e9167ea338d.png", "Raven")
skull = ("https://purepng.com/public/uploads/large/purepng.com-fortnite-skull-trooperfortnitefortnite-battle-royalebattle-royaleepic-gamesgames-12515254364375yi3s.png", "Skull Trooper")
omega = ("https://purepng.com/public/uploads/large/purepng.com-fortnite-omegafortnitefortnite-battle-royalebattle-royaleepic-gamesgames-1251525435821xpok6.png", "Omega")
brite = ("https://purepng.com/public/uploads/large/purepng.com-fortnite-brite-bomberfortnitefortnite-battle-royalebattle-royaleepic-gamesgames-1251525434315m6oic.png", "Brite Bomber")
marsh = ("https://purepng.com/public/uploads/large/fortnite-moisty-merman-jil.png", "Moisty Merman")
dark = ("https://purepng.com/public/uploads/large/fortnite-the-visitor-mff.png", "The Visitor")
hayata = ("https://purepng.com/public/uploads/large/fortnite-fate-ow7.png", "Fate")
chomp = ("https://purepng.com/public/uploads/large/fortnite-chomp-sr-8jo.png", "Chomp Sr.")



skins.append(renegade)
skins.append(peely)
skins.append(raven)
skins.append(skull)
skins.append(omega)
skins.append(brite)
skins.append(marsh)
skins.append(dark)
skins.append(hayata)
skins.append(chomp)



@app.route("/")
def hello():
    return render_template('index1.html')

@app.route("/toggle_theme", methods=['POST'])
def toggle_theme():
    dark_mode = not session.get('dark_mode', False) #Gets current theme
    session['dark_mode'] = dark_mode    #Updates theme with new theme

    response = make_response(jsonify({'dark_mode': dark_mode}))

    return response

@app.route('/data', methods=["GET", "POST"])
def data():
    if request.method == 'POST':
        global image_url
        file = request.files['file']
        data = pd.read_excel(file)
        print(data.values.tolist()[1][0].split(", ")[3])
        tmp = list(filter(lambda x: x[0].split(", ")[3]=="Incomplete", data.values.tolist()))
        for sublist in tmp:
            if sublist:
                task_info = sublist[0].split(",")[0].strip()
                incompletetasks.append(task_info)

        tmp =  list(filter(lambda x: x[0].split(", ")[3]=="Completed", data.values.tolist()))
        for sublist in tmp:
            if sublist:
                task_info = sublist[0].split(",")[0].strip()
                completetasks.append(task_info)
    
    return jsonify({'incompleted_Tasks': incompletetasks, 'completed_Tasks': completetasks})



@app.route('/fort', methods=["GET","POST"])
def fort():
    if request.method == 'POST':
        num = random.randint(0, skins.__len__()-1)
        selected = skins[num]
        
    return jsonify({'image_url': selected[0], 'skin_name':selected[1]})

@app.route('/stock', methods=["GET"])
def stock():
    api_key = 'irGmeicrPktWVM6KjZy9SqG2o8eyfe3D'
    symbol = 'AAPL'

    api_url = f'https://financialmodelingprep.com/api/v3/stock/real-time-price/AAPL?apikey=irGmeicrPktWVM6KjZy9SqG2o8eyfe3D'
    response = requests.get(api_url)

    if response.status_code == 200:
        stock_data = response.json()
        stock_price = stock_data.companiesPriceList[0].price;
        print(stock_price)
        return jsonify({'stock_price': stock_price})
    else:
        return jsonify({'error': 'Failed to fetch stock price'}), 500


if __name__ == "__main__":
    app.run(debug=True)