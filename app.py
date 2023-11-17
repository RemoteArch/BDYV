from flask import Flask, jsonify, render_template , request
from pytube import YouTube
import traceback

def ItagresVid(stream):
    s = str(stream)
    #itag = s.split(' ')[1].replace('itag=' , '').replace('\"' ,"")
    res= s.split(' ')[3].replace('res=' , '').replace('\"' ,"")
    return {'res': res , 'url': stream.url}

app = Flask(__name__ , template_folder='template')

@app.route('/stream' , methods=['GET'])
def getStream():
    url = request.args.get('url')
    if url != None:
        try:
            print(url)
            yt = YouTube(url)
            ret= {}
            ret["titre"] = yt.title
            doc = []
            for s in yt.streams.filter(mime_type='video/mp4'):
                doc.append(ItagresVid(s))
            ret['streams']= doc
            return jsonify(ret)
        except Exception as e:
            exception_traceback = traceback.format_exc()
            exception_str = str(e)
            print('erreur',exception_str , exception_traceback)
            return jsonify(['erreur',exception_str , exception_traceback])

@app.route('/' , methods=['GET'])
def home():
    return render_template('acceuil.html')

if __name__ == "__main__":
    app.run( host='0.0.0.0',port=2525)