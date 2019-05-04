from flask import Flask, request
import base64
import json
from helper import pdfFile
from flask_cors import CORS
from celery import Celery
from PyPDF2 import PdfFileReader, PdfFileWriter
import os
os.environ.setdefault('FORKED_BY_MULTIPROCESSING', '1')

app = Flask(__name__)

BROKER_URL = 'redis://localhost:6379/0'
BACKEND_URL = 'redis://localhost:6379/1'
celery = Celery('tasks', broker=BROKER_URL, backend=BACKEND_URL)

CORS(app)

@app.route('/api/upload', methods=['POST'])
def receiveData():
    data = request.data
    data = data.decode("utf-8")
    encoded = data.split(",")[1].encode("utf-8")
    with open('FromClientSide.pdf', 'wb') as file:
        file.write(base64.decodestring(encoded))
    # recievePDFData.delay(encoded)
    return "got pdf data"

@app.route('/api/split',  methods=['GET'])
def splitPDF():
    pageNum = PdfFileReader(open("FromClientSide.pdf", "rb")).getNumPages()
    path = './FromClientSide.pdf'
    pdf = PdfFileReader(path, "rb")

    pdf_writer = PdfFileWriter()

    for page in range(1, pageNum):
        pdf_writer.addPage(pdf.getPage(page))

    output_fname = "Output.pdf"

    with open(output_fname, 'wb') as out:
        pdf_writer.write(out)

    return ("PDF file has been split")

@app.route('/process/<name>')
def process(name):
    reverse.delay(name)
    return "async sent"

@celery.task(name='celery_POST_data.recievePDFData')
def recievePDFData(byteData):
    with open('FromClientSide.pdf', 'wb') as file:
        file.write(base64.decodestring(byteData))
    return "celery: got pdf data"

@celery.task()
def reverse(string):
    return string[::-1]


if __name__ == '__main__':
    app.run(debug=True)
