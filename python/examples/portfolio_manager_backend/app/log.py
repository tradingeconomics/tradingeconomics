"""
Logging utilities and custom logger configuration.
"""

import logging


def setup_custom_logger(name: str) -> logging.Logger:
    """Create and configure a custom logger with a standard console handler."""

    logger = logging.getLogger(name)
    if not logger.handlers:
        formatter = logging.Formatter(
            fmt="%(asctime)s - %(levelname)s - %(module)s - %(message)s"
        )

        handler = logging.StreamHandler()
        handler.setFormatter(formatter)

        logger.addHandler(handler)

    logger.setLevel(logging.DEBUG)
    return logger
