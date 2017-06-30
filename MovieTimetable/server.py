from BaseHTTPServer import BaseHTTPRequestHandler
import urlparse, json
from pymongo import MongoClient
import pymongo
from BaseHTTPServer import HTTPServer

client = MongoClient('34.209.154.54', 27017)
collection_movie = client.movietimetable.movie
collection_day = client.movietimetable.day
collection_hour = client.movietimetable.hour


class GetHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        parsed_path = urlparse.urlparse(self.path)
        self.send_response(200)
        self.end_headers()
        self.wfile.write(collection.find())
        return
server = HTTPServer(('0.0.0.0',49707 ), GetHandler)

server.serve_forever()


