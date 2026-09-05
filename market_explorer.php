<?php
// I will extend this part if I need to call some data from an external database to be applied with Trading Economics data.
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trading Economics | Market Search — Developed by Obasegun Ayodele</title>
    <!-- I am linking Google Fonts for better typography -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        /* Global Styles */
        body {
            font-family: 'Poppins', sans-serif; /* Applying a clean font style */
            background-color: #f4f7fc; /* Light background color */
            margin: 0;
            padding: 0;
        }

        /* Container to center the content on the screen */
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh; /* Full viewport height */
            padding: 20px;
        }

        /* Styling for the search box container */
        .search-box {
            background-color: #fff; /* White background */
            border-radius: 8px; /* Rounded corners */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
            width: 100%;
            max-width: 600px; /* Maximum width of the search box */
            padding: 30px;
            text-align: center;
        }

        .search-box h1 {
            color: #333; /* Dark color for the header */
            font-weight: 600; /* Bold weight for the header */
            margin-bottom: 10px;
        }

        .search-box p {
            color: #777; /* Light grey for the description text */
            margin-bottom: 20px;
        }

        /* Styles for the input groups (country & category select) */
        .inputs {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .input-group {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        /* Common styles for input, select, and button elements */
        input, select, button {
            width: 100%; /* Full width of the container */
            padding: 10px; /* Padding for better touch area */
            margin-top: 5px;
            border-radius: 6px; /* Rounded corners */
            border: 1px solid #ddd; /* Light border */
            font-size: 16px; /* Adequate font size */
        }

        select, button {
            cursor: pointer; /* Change cursor on hover */
        }

        /* Button styles */
        button {
            background-color: #007BFF; /* Primary blue color */
            color: white; /* White text */
            border: none; /* No border */
            font-weight: 600;
            transition: background-color 0.3s; /* Smooth transition on hover */
        }

        /* Button hover effect */
        button:hover {
            background-color: #0056b3; /* Darker blue on hover */
        }

        /* Styles for the result container */
        .result {
            margin-top: 30px;
            padding: 20px;
            background-color: #f9f9f9; /* Light grey background */
            border-radius: 8px;
            display: none; /* Initially hidden */
            max-height: 300px; /* Fixed height for scrollable results */
            overflow-y: auto; /* Enable vertical scrolling */
        }

        /* List styles for result items */
        .result ul {
            list-style-type: none; /* Remove default list bullets */
            padding: 0;
            margin: 0;
        }

        .result ul li {
            padding: 15px;
            border-bottom: 1px solid #ddd; /* Separator between items */
            background-color: #fff; /* White background for each result item */
            transition: background-color 0.3s; /* Smooth background color transition */
        }

        /* Alternate background color for even result items for readability */
        .result ul li:nth-child(even) {
            background-color: #f4f7fc; /* Light grey for even items */
        }

        /* Hover effect on result items */
        .result ul li:hover {
            background-color: #e8f4ff; /* Light blue on hover */
        }

        /* Styling for result item details */
        .result ul li span {
            display: block;
            color: #555; /* Darker grey for description text */
            margin-top: 5px;
        }

        /* Responsive design for smaller screens (e.g., mobile, and tablets) */
        @media (max-width: 768px) {
            .search-box {
                padding: 20px; /* Less padding on smaller screens */
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="search-box">
            <h1>Trading Economics: Market Search</h1>
            
            
            <p>Find markets based on country and category</p>

            <!-- User inputs for country and category -->
            <div class="inputs">
                <div class="input-group">
                    <label for="country">Select Country</label>
                    <!-- Dropdown for selecting country -->
                    <select id="country">
                        <option value="mexico">Mexico</option>
                        <option value="new zealand">New Zealand</option>
                        <option value="sweden">Sweden</option>
                        <option value="thailand">Thailand</option>
                    </select>
                </div>

                <div class="input-group">
                    <label for="category">Select Category</label>
                    <!-- Dropdown for selecting category -->
                    <select id="category">
                        <option value="index">Index</option>
                        <option value="markets">Markets</option>
                        <option value="forex">Forex</option>
                        <option value="bond">Bond</option>
                        <option value="commodity">Commodity</option>
                    </select>
                </div>

                <!-- Search button that triggers the getMarkets function -->
                <button class="search-btn" onclick="getMarkets()">Search</button>
            </div>

            <!-- Container for displaying search results -->
            <div id="result" class="result"></div>
            <br><br>
            <div style="font-size: 9px;">Developed by Obasegun Ayodele | Copyright © 2025 TRADING ECONOMICS | All Rights Reserved</div>
        </div>
        
    </div>

    <script>
        // JavaScript function to fetch market data based on user input
        function getMarkets() {
            // API key for Trading Economics (replace with your own key)
            const apiKey = 'd1d4baa5543c4c6:y7gcb6pyy0dgci4';
            // Get selected country and category from the user inputs
            const country = document.getElementById('country').value;
            const category = document.getElementById('category').value;
            // Construct the API URL with the selected values
            const url = `https://api.tradingeconomics.com/markets/search/${country}?c=${apiKey}&category=${category}`;

            // Fetch market data from Trading Economics API
            fetch(url)
                .then(response => response.json()) // Parse JSON response
                .then(data => {
                    const resultContainer = document.getElementById('result');
                    resultContainer.innerHTML = ''; // Clear any previous results
                    resultContainer.style.display = 'block'; // Show results container

                    // Check if data is available
                    if (data && data.length > 0) {
                        let resultHTML = '<ul>';
                        // Loop through each result and format it into HTML
                        data.forEach(item => {
                            resultHTML += `
                                <li>
                                    <strong>${item.Name}</strong>
                                    <span>Symbol: ${item.Symbol}</span>
                                    <span>Last Close: ${item.Last ? item.Last : 'N/A'}</span>
                                </li>
                            `;
                        });
                        resultHTML += '</ul>';
                        resultContainer.innerHTML = resultHTML; // Display the formatted results
                    } else {
                        resultContainer.innerHTML = '<p>No data found for the selected country and category.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error); // Log any errors
                    document.getElementById('result').innerHTML = '<p>Something went wrong. Please try again later.</p>';
                });
        }
    </script>
    
</body>
</html>
