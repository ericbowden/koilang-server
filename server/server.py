from flask import Flask, request, jsonify, send_from_directory

import spacy
from spacy import displacy
import argparse

# Process args
parser = argparse.ArgumentParser()
parser.add_argument('-d', '--dev', action='store_true')
parser.add_argument('-p', '--port')
args = parser.parse_args()

# Initialize Flask app and CORS
app = Flask(__name__)

# Load spaCy model
nlp = spacy.load('en_core_web_sm')

# Define REST API route for processing text with spaCy
@app.route('/process', methods=['POST'])
def process_text():
    data = request.json
    text = data.get('text', '')

    # Process text with spaCy
    doc = nlp(text)

    # Parse entities
    # ents_parse = displacy.parse_ents(doc)
    # parse_html = displacy.render(ents_parse, style="ent", manual=True)

    # Parse dependencies
    deps_parse = displacy.parse_deps(doc)
    deps_html = displacy.render(deps_parse, style="dep", manual=True)

    response = jsonify({'parsed': deps_parse, 'html': deps_html})

    return response

# Serve Client
@app.route('/<path:path>')
def send_dist(path):
    return send_from_directory('dist', path)

@app.route("/")
def index():
    return send_from_directory("dist", "index.html")

if __name__ == '__main__':

    port = 8080
    if args.port != None:
        port = args.port

    # Run the server
    if args.dev:
        app.run(debug=True, port=port)
    else:
        print('Starting server on http://localhost:'+str(port))
        from waitress import serve
        serve(app, host="0.0.0.0", port=port)
