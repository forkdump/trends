import web

urls = (
   '/', 'index',
    '/process', 'process'
)

class index:
    def GET(self):
        return 'index.html'
class process:
    def POST(self):
        return [1, 2, 3, 4, 5]

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()