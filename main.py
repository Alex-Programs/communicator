from flask import Flask, send_from_directory, render_template, request

from waitress import serve

from secrets import token_urlsafe

from tinydb import TinyDB, Query

import json

db = TinyDB("entries.json")

app = Flask(__name__)


def gen_uid():
    return token_urlsafe(32)


@app.route("/assets/<path:path>")
def send_assets(path):
    return send_from_directory("assets/", path)

@app.route("/")
def redir():
    return render_template("edit.html", entries=db.all())

@app.route("/edit")
def edit():
    return render_template("edit.html", entries=db.all())


@app.route("/api/new", methods=["POST"])
def new():
    color = request.form["color"]
    text = request.form["text"]

    db.insert({"uid": gen_uid(), "color": color, "text": text})

    return "OK", 200


@app.route("/api/delete", methods=["POST"])
def delete():
    print("Delete")
    uid = request.headers["uid"]

    print(str(uid))

    entry = Query()
    db.remove(entry.uid == str(uid))

    return "OK", 200

@app.route("/main")
def main():
    return render_template("main.html")

@app.route("/api/entries")
def send_entries():
    print(str(json.dumps(db.all())))
    return json.dumps(db.all())

serve(app, host="0.0.0.0", port=9010)
# app.run(host="0.0.0.0", port=9010, debug=True)
