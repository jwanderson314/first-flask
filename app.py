from flask import Flask, jsonify, make_response, redirect, render_template, request, session, url_for

app = Flask(__name__)

tasks = []

app.secret_key = 'jason'

@app.route("/")
def hello():
    return render_template('index1.html')

@app.route("/toggle_theme", methods=['POST'])
def toggle_theme():
    dark_mode = not session.get('dark_mode', False) #Gets current theme
    session['dark_mode'] = dark_mode    #Updates theme with new theme

    response = make_response(jsonify({'dark_mode': dark_mode}))

    return response




app.run(debug=True)