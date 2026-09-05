document.addEventListener('DOMContentLoaded', () => {
    const compareBtn = document.getElementById('compareBtn');
    const loadingSpinner = document.getElementById('loading');
    const resultsSection = document.getElementById('results');
    const comparisonResults = document.getElementById('comparisonResults');

    // Add function to fetch comparison data
    async function fetchComparisonData(country1, country2, indicators) {
        const queryParams = indicators ? `?indicators=${indicators.join(',')}` : '';
        const url = `http://localhost:3000/compare/${encodeURIComponent(country1)}/${encodeURIComponent(country2)}${queryParams}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    // Update click event handler to use GET request
    compareBtn.addEventListener('click', async () => {
        const country1 = document.getElementById('country1').value.trim();
        const country2 = document.getElementById('country2').value.trim();
        
        const indicators = Array.from(document.querySelectorAll('.indicator-checkbox:checked'))
            .map(checkbox => checkbox.value);

        if (!country1 || !country2) {
            alert('Please enter both countries');
            return;
        }

        if (indicators.length === 0) {
            alert('Please select at least one indicator');
            return;
        }

        try {
            loadingSpinner.classList.remove('hidden');
            const data = await fetchComparisonData(country1, country2, indicators);
            displayResults(data);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to compare countries. Please try again.');
        } finally {
            loadingSpinner.classList.add('hidden');
        }
    });

    function displayResults(data) {
        comparisonResults.innerHTML = '';
        resultsSection.classList.remove('hidden');
    
        // Add timestamp and metadata
        const metadataDiv = document.createElement('div');
        metadataDiv.className = 'bg-blue-50 p-4 rounded-lg mb-6';
        metadataDiv.innerHTML = `
            <p class="text-sm text-gray-600">Last updated: ${new Date(data.timestamp).toLocaleString()}</p>
            <p class="text-sm text-gray-600">Comparing: ${data.metadata.countries.join(' vs ')}</p>
            <p class="text-sm text-gray-600">Indicators: ${data.metadata.indicators.join(', ')}</p>
        `;
        comparisonResults.appendChild(metadataDiv);
    
        const { country1, country2 } = data.comparison;
    
        Object.entries(country1.indicators).forEach(([indicator, value]) => {
            const country2Value = country2.indicators[indicator];
            
            const card = document.createElement('div');
            card.className = 'comparison-card bg-white p-6 rounded-lg shadow-lg mb-4 hover:shadow-xl transition-shadow';
            
            card.innerHTML = `
                <h3 class="text-xl font-semibold mb-4 text-blue-800 capitalize">${indicator}</h3>
                <div class="grid grid-cols-2 gap-6">
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h4 class="font-medium text-gray-700 mb-2">${country1.name}</h4>
                        <div class="space-y-2">
                            <p class="indicator-value text-2xl font-bold text-blue-600">
                                ${value?.LatestValue || 'N/A'} ${value?.Unit || ''}
                            </p>
                            <p class="text-sm text-gray-500">Previous: ${value?.PreviousValue || 'N/A'}</p>
                            <p class="text-sm text-gray-500">Last Update: ${new Date(value?.LatestValueDate).toLocaleDateString()}</p>
                            <p class="text-xs text-gray-400">Source: ${value?.Source || 'N/A'}</p>
                        </div>
                    </div>
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h4 class="font-medium text-gray-700 mb-2">${country2.name}</h4>
                        <div class="space-y-2">
                            <p class="indicator-value text-2xl font-bold text-blue-600">
                                ${country2Value?.LatestValue || 'N/A'} ${country2Value?.Unit || ''}
                            </p>
                            <p class="text-sm text-gray-500">Previous: ${country2Value?.PreviousValue || 'N/A'}</p>
                            <p class="text-sm text-gray-500">Last Update: ${new Date(country2Value?.LatestValueDate).toLocaleDateString()}</p>
                            <p class="text-xs text-gray-400">Source: ${country2Value?.Source || 'N/A'}</p>
                        </div>
                    </div>
                </div>
                <div class="mt-4 text-xs text-gray-400">
                    <p>Category Group: ${value?.CategoryGroup || 'N/A'}</p>
                    <p>Frequency: ${value?.Frequency || 'N/A'}</p>
                </div>
            `;
    
            comparisonResults.appendChild(card);
        });
    }

    // Add auto-refresh feature (optional)
    let autoRefreshInterval;
    const startAutoRefresh = (minutes = 5) => {
        if (autoRefreshInterval) clearInterval(autoRefreshInterval);
        autoRefreshInterval = setInterval(() => {
            if (document.getElementById('country1').value && document.getElementById('country2').value) {
                compareBtn.click();
            }
        }, minutes * 60 * 1000);
    };

    // Start auto-refresh when page loads
    startAutoRefresh();
});