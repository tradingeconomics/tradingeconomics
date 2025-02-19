
<?php 

$url = 'https://api.tradingeconomics.com/news';
$headers = array(
    "Accept: application/xml",
    "Authorization: Client guest:guest"
);
$handle = curl_init(); 
    curl_setopt($handle, CURLOPT_URL, $url);
    curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    
$response = curl_exec($handle);
$data = json_decode($response, true);
curl_close($handle);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Alpine Plugins -->
    <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/collapse@3.x.x/dist/cdn.min.js"></script> 
    <!-- Alpine Core -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>   
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Economic News</title>
</head>
<body>
<div class="p-8">
    <h1 class="max-w-2xl mx-auto text-3xl pb-4 font-bold">Latest Economics News</h1>
    <div class="grid gap-4 mb-4 max-w-screen-xl mx-auto">

    <?php 
    
    if(count($data) > 0) {
        $indexedData = [];
        foreach ($data as $item) {
            $indexedData[$item['id']] = $item;
    ?>

    <div>
        <div class="max-w-2xl mx-auto rounded overflow-hidden shadow-lg">
            <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2"><?php echo $indexedData[$item['id']]['title']; ?></div>
            <span class="inline-block py-1 text-sm text-gray-700 italic mr-2 mb-2">
                <div class="flex justify-between items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span class="ml-1">
                        <?php
                            $dateString = $indexedData[$item['id']]['date']; 
                            $date = new DateTime($dateString, new DateTimeZone("UTC"));
                            $date->setTimezone(new DateTimeZone("America/New_York"));
                            $formattedDate = $date->format("M d, Y h:i A T");                    
                            echo $formattedDate;
                        ?>
                    </span>  
                </div>
            
            </span>
            <div x-data="{ expanded: false }">
            <p x-show="expanded" x-collapse.min.70px class="text-gray-800 mt-2">
                <?php echo htmlspecialchars($indexedData[$item['id']]['description']); ?>
            </p>
            
            <!-- Toggle Button -->
            <button @click="expanded = !expanded" 
                    class="mt-3 mb-4 flex items-center text-blue-600 font-semibold hover:text-blue-800 transition">
                <span x-text="expanded ? 'Read Less' : 'Read More'"></span>
                <svg xmlns="http://www.w3.org/2000/svg" 
                     class="w-5 h-5 ml-1 transform transition-transform duration-300 ease-in-out" 
                     :class="expanded ? 'rotate-180' : 'rotate-0'" 
                     viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>           
        </div>
        <div class="pt-4 pb-2">            
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><?php echo $indexedData[$item['id']]['country']; ?></span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><?php echo $indexedData[$item['id']]['category']; ?></span>
        </div>
        </div>
        </div>

        <?php                    
                }
            }  
        ?>
        </div>
    </div>
  </div>
</div>
</body>
</html>

