import requests
import json
import time
import sys
nextpost = ""
file = open("data.json", "a")
file.write('{"data":[')
file.close()
subreddit = sys.argv[1]
keyword = sys.argv[2]
r = requests.get("http://www.reddit.com/r/" + subreddit +"/search.json?q=" + keyword + "&sort=new&restrict_sr=on&limit=100")
for x in range(0,10000000):
	file = open("search.json", "w")
	file.write(r.text)
	file.close()
	json_data=open('search.json')
	data = json.load(json_data)
	file = open("data.json", "a")
	for x in range(0,100):
		try:
			apple = data["data"]["children"][x]["data"]["title"]
			if '\u200e' not in apple:
				apple = apple.replace('"','\\"')
				file.write("{")
				file.write("\n")
				file.write('\t"title"' + ' : ' + '"')
				file.write(apple);
				file.write('",')
				file.write("\n")
				file.write('\t"created"' + ' : ')
				file.write(str(data["data"]["children"][x]["data"]["created"]))
				file.write("\n")
				file.write("},")
				file.write("\n")
		except:
			pass
	try:
		data["data"]["after"]
		nextpost = data["data"]["after"]
	except:
		pass
	file.close()
	r = requests.get("http://www.reddit.com/r/" + subreddit +"/search.json?q=" + keyword + "&sort=new&restrict_sr=on&limit=100&after=" + nextpost)
	time.sleep(10)
