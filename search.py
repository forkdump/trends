import requests
import json
import time
import sys

user_agent = {'User-agent': 'super cool UVA bot by /u/AD_Curry'}
def getSubData(subreddit, keyword):
    next_id = ""
    data_str = '{"data":['
    search_json = ""
    r = requests.get("http://www.reddit.com/r/" + subreddit +"/search.json?q=" + keyword + "&sort=new&restrict_sr=on&limit=100", headers = user_agent)
    # Loop over the first 100 pages of results
    for page in range(0,100):
            search_json = r.text
            data = json.loads(search_json)
            #Loop over all the posts on a page
            for post_index in range(0, len(data["data"]["children"]) - 1):
                    post = data["data"]["children"][post_index]["data"]["title"]
                    post = post.replace('"','\\"')
                    created = str(data["data"]["children"][post_index]["data"]["created"])
                    score = str(data["data"]["children"][post_index]["data"]["score"])
                    data_str += '{\n\t"title": "' + post + '",\n'
                    data_str += '{\n\n"score": "' + score + '",\n'
                    data_str += '\t"created": ' + created + "\n},\n"
            print "Processed page " + str(page)
            if(data["data"]["after"]):
                    next_id = data["data"]["after"]
            time.sleep(1/15)
            r = requests.get("http://www.reddit.com/r/" + subreddit +"/search.json?q=" + keyword + "&sort=new&restrict_sr=on&limit=100&after=" + next_id, headers = user_agent)

    data_str += "]}"

    file = open(("./data/" + subreddit.encode('utf-8') + "-" + keyword.encode('utf-8') + ".json"), "w")
    file.write(data_str.encode('utf-8'))
    file.close()

    
if __name__ == "__main__":
        if(len(sys.argv) < 3):
                print "Must supply command line arguments!"
        getSubData(sys.argv[1], sys.argv[2])
