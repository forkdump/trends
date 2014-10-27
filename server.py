# 'pip install bottle' before running this!
from bottle import route, run, get, post, request, static_file
import search

@post('/process')
def process():
    subreddit = request.data.get('subreddit')
    topics = request.data.get('topics')
    return str(subreddit) + ", " + str(topics)

@route('/')
def root():
    return static_file('index.html', root='/')

@route('/resources/<filename>')
def server_static(filename):
        return static_file(filename, root='/resources')

run(host='localhost', port=8080, debug=True)
