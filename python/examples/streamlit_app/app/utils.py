import tradingeconomics as te
import pandas as pd
import numpy as np

from typing import Tuple, List, Dict

# Constants
COUNTRY_NAME_TO_CODE: Dict[str, str] = {
    "Mexico": "MEX",
    "Sweden": "SWE",
    "Thailand": "THA",
}
IMPORT_CODE: str = "00001"
EXPORT_CODE: str = "00002"


def generate_comtrade_symbol(country1: str, country2: str, trade_code: str) -> str:
    """
    Generate a comtrade symbol for the specified countries and trade code.

    Args:
        country1 (str): The first country's name.
        country2 (str): The second country's name.
        trade_code (str): The trade code (import or export).

    Returns:
        str: The comtrade symbol representing the trade relationship between two countries.
    """
    global COUNTRY_NAME_TO_CODE

    return (
        f"{COUNTRY_NAME_TO_CODE[country1]}{COUNTRY_NAME_TO_CODE[country2]}{trade_code}"
    )


def fetch_trade_data(
    import_symbol: str, export_symbol: str
) -> Tuple[List[Dict[str, str]], List[Dict[str, str]]]:
    """
    Fetch trade data for import and export symbols from the Trading Economics API.

    Args:
        import_symbol (str): The comtrade symbol for import data.
        export_symbol (str): The comtrade symbol for export data.

    Returns:
        Tuple[List[Dict[str, str]], List[Dict[str, str]]]: A tuple containing import and export data lists.

    Raises:
        ValueError: If the lengths of import and export data are not equal.
    """
    import_data = te.getCmtHistorical(symbol=import_symbol)
    export_data = te.getCmtHistorical(symbol=export_symbol)

    if len(import_data) != len(export_data):
        raise ValueError(
            f"import_data (length: {len(import_data)}) and export_data (length: {len(export_data)}) are not of the same length."
        )

    return import_data, export_data


def process_trade_data(
    import_data: List[Dict[str, str]], export_data: List[Dict[str, str]]
) -> pd.DataFrame:
    """
    Process and format trade data for visualization.

    Args:
        import_data (List[Dict[str, str]]): List of dictionaries with import data.
        export_data (List[Dict[str, str]]): List of dictionaries with export data.

    Returns:
        pd.DataFrame: A DataFrame with processed trade data including years, imports, exports, and net exports.
    """
    years = np.array([entry["date"][:4] for entry in import_data])
    imports = np.array([-entry["value"] for entry in import_data])
    exports = np.array([entry["value"] for entry in export_data])
    net_exports = exports + imports

    return pd.DataFrame(
        {
            "year": years,
            "imports": imports,
            "exports": exports,
            "net_exports": net_exports,
        }
    )
