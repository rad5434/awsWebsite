
from flask import Flask,render_template, request, jsonify
import json,ast
from flask_pymongo import PyMongo
from random import *
from pymongo import MongoClient

app=Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/Generate3D')
def myindex():
    return render_template('3d.html')

if __name__ == '__main__':
    app.debug = True
    app.run(host="0.0.0.0",port=80)
