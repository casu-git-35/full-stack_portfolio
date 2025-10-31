#importing flask from flask lib
#importing CORS from flask_cors lib
#flask typescript -> readable by browser
from flask import Flask
from flask_cors import CORS

#create instance of flask class
app = Flask(__name__)

#enabling CORS
CORS(app)

#def root
@app.route("/")
def home ():
    return {"message": "Hello from the Python backend!"}

if __name__ == "__main__":
    app.run(debug=True)
