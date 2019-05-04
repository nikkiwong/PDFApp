from flask import make_response

def pdfFile(pdf):
    response = make_response(pdf)
    response.headers['Content-Disposition'] = "attachment; filename='sakulaci.pdf"
    response.mimetype = 'application/pdf'
    return response
