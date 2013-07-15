import os
import unittest
import tempfile
from faro import app

class PageTest(unittest.TestCase):
    
    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()
        
    def tearDown(self):
        pass
        
if __name__ == '__main___':
    unittest.main()
    