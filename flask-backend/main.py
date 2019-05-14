from flask import Flask, request,jsonify
import base64
import json
from flask_cors import CORS, cross_origin
from celery import Celery
from PyPDF2 import PdfFileReader, PdfFileWriter
import os
os.environ.setdefault('FORKED_BY_MULTIPROCESSING', '1')

app = Flask(__name__)

BROKER_URL = 'redis://localhost:6379/0'
BACKEND_URL = 'redis://localhost:6379/1'
celery = Celery('tasks', broker=BROKER_URL, backend=BACKEND_URL)

CORS(app, support_credentials=True)

@app.route('/api/upload', methods=['POST'])
@cross_origin(supports_credentials=True)
def receiveData():
    data = request.data
    data = data.decode("utf-8")
    encoded = data.split(",")[1].encode("utf-8")
    with open('FromClientSide.pdf', 'wb') as file:
        file.write(base64.decodestring(encoded))
    # recievePDFData.delay(encoded)
    return "got pdf data"

@app.route('/api/split',  methods=['GET'])
@cross_origin(supports_credentials=True)
def splitPDF():
    pageNum = PdfFileReader(open("FromClientSide.pdf", "rb")).getNumPages()
    path = './FromClientSide.pdf'
    pdf = PdfFileReader(path, "rb")
    splitFiles = []
    # can take in variable for how many splits.. but for now I will hard code
    for index in range(0, pageNum, 3):
        pdf_writer = PdfFileWriter()
        lastPage = index+3
        if (lastPage > pageNum):
            lastPage = pageNum
        for page in range(index, lastPage):
            pdf_writer.addPage(pdf.getPage(page))
        output_fname = "Pages {}-{}.pdf".format(index+1,lastPage)
        splitFiles.append(output_fname)
        with open(output_fname, 'wb') as out:
            pdf_writer.write(out)

    return jsonify({'data': splitFiles})

@app.route('/api/saveGrouping',  methods=['POST'])
@cross_origin(supports_credentials=True)
def saveGrouping():
    data = request.get_json()
    print(data)
    return "saving Grouping"

if __name__ == '__main__':
    app.run(debug=True)
