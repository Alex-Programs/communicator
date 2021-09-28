import pymongo
from random import choice

client = pymongo.MongoClient("mongodb://localhost")
db = client["talker"]
entries = db["entries"]