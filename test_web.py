import unittest
import urllib2
from faro import app
from flask import request

class PageTest(unittest.TestCase):
    
    def setUp(self):
        self.app = app.test_client()
           
    def test_Home(self):
        rv = self.app.get('/')
        self.assertEquals(rv, '<Response streamed [200 OK]>')
        
if __name__ == '__main__':
    unittest.main()
    