import unittest
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import tradingeconomics as te
te.login('guest:guest')

class TestgetCmtCountryByCategory(unittest.TestCase):
    
    def test_getCmtCountryByCategory(self):
        a = te.getCmtCountryByCategory(country = 'United kingdom', type='import',output_type = 'df')
        self.assertEqual(a['country'][0], 'United Kingdom')
    
    def test_getCmtCountryByCategory2(self):
        a = te.getCmtCountryByCategory(country = 'India', type='import',output_type = 'df')
        self.assertCountEqual(a.columns, ['symbol', 'country', 'value', 'date', 'type', 'category', 'url', 'title', 'StartDate', 'lastupdate'])

    def test_getCmtCountryByCategory3(self):
        a = te.getCmtCountryByCategory(country = 'India', type='import', category='Coffee, tea, mate and spices', output_type = 'df')
        self.assertCountEqual(a.columns, ['symbol', 'country1', 'country2', 'value', 'date', 'type', 'category', 'url', 'title', 'StartDate', 'lastupdate'])

class TestgetCmtSnapshotByType(unittest.TestCase):
    
    def test_getCmtSnapshotByType(self):
        a = te.getCmtSnapshotByType(country = 'Portugal', type='import',output_type = 'df')
        self.assertEqual(a['country1'][0], 'Portugal')
   
if __name__ == "__main__":
    unittest.main()