from flask import Flask, render_template, url_for, jsonify, request
import sentiment

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/sentiment-analysis", methods=["POST"])
def sentiment_analysis():
    data = request.get_json()
    input_text = data["inputText"]
    input_lang = data["inputLanguage"]
    output_text = data["outputText"]
    output_lang = data["outputLanguage"]
    response = sentiment.get_sentiment(input_text, input_lang, output_text, output_lang)
    return jsonify(response)
