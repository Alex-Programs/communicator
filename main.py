from flask import Flask, send_from_directory, render_template

from waitress import serve

from database import entries

app = Flask(__name__)

# TODO:
# page for creating the entries
# main page

@app.route("/assets/<path:path>")
def send_assets(path):
    return send_from_directory("assets/", path)

@app.route("/edit")
def edit():
    return render_template("edit.html", entries=entries.find({}))

serve(app, host="0.0.0.0", port=9010)
