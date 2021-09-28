from flask import Flask, send_from_directory, render_template, request

from waitress import serve

from database import entries
from secrets import token_urlsafe

app = Flask(__name__)


def gen_uid():
    return token_urlsafe(32)


@app.route("/assets/<path:path>")
def send_assets(path):
    return send_from_directory("assets/", path)


@app.route("/edit")
def edit():
    return render_template("edit.html", entries=entries.find({}))


@app.route("/api/new", methods=["POST"])
def new():
    color = request.form["color"]
    text = request.form["text"]

    entries.insert_one({"uid": gen_uid(), "color": color, "text": text})

    return "OK", 200


@app.route("/api/delete", methods=["POST"])
def delete():
    print("Delete")
    uid = request.headers["uid"]

    print(str(uid))

    entries.delete_many({"uid": uid})

    return "OK", 200


# serve(app, host="0.0.0.0", port=9010)
app.run(host="0.0.0.0", port=9010, debug=True)
