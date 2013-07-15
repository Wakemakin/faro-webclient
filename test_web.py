import unittest
import urllib2
from faro import app
from flask import request

class PageTest(unittest.TestCase):
    
    def setUp(self):
        self.app = app.test_client()
           
    def test_Home(self):
        with app.test_request_context('/homes'):
            assert request.path == '/homes'
        
if __name__ == '__main__':
    unittest.main()
    