# 'pip install bottle' before running this!
from bottle import route, run, get, post, request, static_file, response
import search, json, os

@post('/process')
def process():
    subreddit = request.forms.get('subreddit')
    topic = request.forms.get('topic')
    startDate = request.forms.get('startDate')
    endDate = request.forms.get('endDate')
    print "Requested: ", subreddit, topic
    # return static_file("programming-ruby.json", root="./data/")
    response.content_type = 'application/json'
    if(os.path.exists('data/' + subreddit + '-' + topic + '.json')):
        return static_file(subreddit + '-' + topic + '.json', root='./data')
    return search.getSubData(subreddit, topic, startDate, endDate)

@route('/')
def root():
    print "root!" 
    return static_file('index.html', root='./resources')

@route('/resources/<filename>')
def server_static(filename):
        return static_file(filename, root='./resources')

@route('/css/<filename>')
def server_static(filename):
        return static_file(filename, root='./css')

@route('/js/<filename>')
def server_static(filename):
        return static_file(filename, root='./js')

@route('/data/<filename>')
def server_static(filename):
        return static_file(filename, root='./data')

run(host='localhost', port=8080, debug=True)
