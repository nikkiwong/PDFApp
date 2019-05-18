from flask import Flask, request,jsonify
import base64
import redis
import json
from flask_cors import CORS, cross_origin
from PyPDF2 import PdfFileReader, PdfFileWriter
from helper import convertToBinaryData
import os
os.environ.setdefault('FORKED_BY_MULTIPROCESSING', '1')

app = Flask(__name__)

r = redis.Redis(host='localhost', port=6379, db=0)

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
    pageRange = 20
    for index in range(0, pageNum, pageRange):
        pdf_writer = PdfFileWriter()
        lastPage = index+pageRange
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
    data = request.data
    d = data.decode("utf-8")
    d = json.loads(d)
    print(d)
    fileInBinaryFormat = ""
    for key in d:
        for file in d[key]:
            fileInBinaryFormat = convertToBinaryData(file)
            r.sadd(key, fileInBinaryFormat)
        print(r.scard(key))
    return fileInBinaryFormat

if __name__ == '__main__':
    app.run(debug=True)
