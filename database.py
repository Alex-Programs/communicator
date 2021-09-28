import pymongo
from random import choice

client = pymongo.MongoClient("mongodb://localhost")
db = client["talker"]
entries = db["entries"]
entries.insert_one({"uid" : choice(range(999,9999999)), "text" : choice(range(1,30))})