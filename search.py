import requests
import json
import time
import sys
def getSubData(subreddit, keyword):
    nextpost = ""
    datastr = '{"data":['
    search_json = ""
    #file = open("data/data.json", "a")
    #file.write('{"data":[')
    #file.close()
    for x in range(0,10000000):
            r = requests.get("http://www.reddit.com/r/" + subreddit +"/search.json?q=" + keyword + "&sort=new&restrict_sr=on&limit=100")
            file = open(subreddit + "-" + keyword + ".json", "w")
            search_json = r.text
            print search_json
            file.write(search_json)
            data = json.loads(search_json)
            for x in range(0, len(data["data"]["children"]) - 1):
                    apple = data["data"]["children"][x]["data"]["title"]
                    created = str(data["data"]["children"][x]["data"]["created"])
                    score = str(data["data"]["children"][x]["data"]["score"])
                    if '\u200e' not in apple:
                            apple = apple.replace('"','\\"')
                            datastr += '{\n\t"title": "' + apple + '",\n'
                            datastr += '{\n\n"score": "' + score + '",\n'
                            datastr += '\t"created": ' + created + "\n},\n"
                            #file.write("\n")
                            #file.write('\t"title"' + ' : ' + '"')
                            #file.write(apple);
                            #file.write('",')
                            #file.write("\n")
                            #file.write('\t"created"' + ' : ')
                            #file.write(str(data["data"]["children"][x]["data"]["created"]))
                            #file.write("\n")
                            #file.write("},")
                            #file.write("\n")
            print "Processed page " + str(x)
            if(data["data"]["after"]):
                    nextpost = data["data"]["after"]
            time.sleep(1/15)
            r = requests.get("http://www.reddit.com/r/" + subreddit +"/search.json?q=" + keyword + "&sort=new&restrict_sr=on&limit=100&after=" + nextpost)
if __name__ == "__main__":
        if(len(sys.argv) < 3):
                print "Must supply command line arguments!"
        getSubData(sys.argv[1], sys.argv[2])
