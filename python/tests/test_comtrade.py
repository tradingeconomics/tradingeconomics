import unittest
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import tradingeconomics as te
te.login('912A151D51F9485:98FA4E298F6B4D0')

class TestgetCmtTotalByTypeAndMainCategory(unittest.TestCase):
    
    def test_getCmtTotalByTypeAndMainCategory(self):
        a = te.getCmtTotalByTypeAndMainCategory(country = 'India', type='import',output_type = 'df')
        self.assertEqual(a['country'][0], 'India')
    
    def test_getCmtTotalByTypeAndMainCategory2(self):
        a = te.getCmtTotalByTypeAndMainCategory(country = 'India', type='import',output_type = 'df')
        self.assertCountEqual(a.columns, ['symbol', 'country', 'value', 'date', 'type', 'category', 'url', 'title', 'StartDate', 'lastupdate'])

    def test_getCmtTotalByTypeAndMainCategory3(self):
        a = te.getCmtTotalByTypeAndMainCategory(country = 'India', type='import', category='Coffee, tea, mate and spices', output_type = 'df')
        self.assertCountEqual(a.columns, ['symbol', 'country1', 'country2', 'value', 'date', 'type', 'category', 'url', 'title', 'StartDate', 'lastupdate'])

if __name__ == "__main__":
    unittest.main()