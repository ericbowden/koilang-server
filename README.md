# koilang-server

Server source code for the koilang translator website

## Development

### Website HTML Client
1. Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  if not already installed
1. Run `npm install` from the command line to install dependencies.
1. Run `npm run dev` to start the local client

### Python Server
1. Install [python](https://www.python.org/downloads/) if not already installed
1. `python3 -m venv server/.venv` to create local python env
1. `source server/.venv/bin/activate` to activate local env
1. `pip install flask spacy waitress` to install needed python dependencies
1. `python3 -m spacy download en_core_web_sm` downloads the needed English language model
1. Run `npm run server` or `python3 server/server.py` to start the local python server





