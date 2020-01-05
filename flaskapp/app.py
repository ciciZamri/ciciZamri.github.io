from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return 'hello'

@app.route('/')
def add_textcorpus():
    pass

@app.route('/')
def get_textcorpus():
    pass

@app.route('/chitchat/add_data')
def add_chitchat_dataset():
    pass

@app.route('/chitchat/get_data')
def get_chitchat_dataset():
    pass

@app.route('/speech/add_data')
def add_speech_dataset():
    pass

@app.route('/speech/get_data')
def get_speech_dataset():
    pass

if __name__ == '__main__':
    app.run(debug=True)