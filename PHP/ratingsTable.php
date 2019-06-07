
<?php 


$url = 'https://api.tradingeconomics.com/ratings';
$headers = array(
    "Accept: application/xml",
    "Authorization: Client guest:guest"
);
$handle = curl_init(); 
    curl_setopt($handle, CURLOPT_URL, $url);
    curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    
$data = json_decode(curl_exec($handle), true);
curl_close($handle);

$rowCols = array();
if( count( $data ) > 0 ) {
    foreach( $data as $key => $value ) {
        if( !isset ( $rowCols[ $key ] ) ) {
            $rowCols[ $key ] = '<tr>';
        }

        foreach( $value as $k => $v ) {
            $rowCols[ $key ] .= '<td>' . $v . '</td>';
        }

        $rowCols[ $key ] .= '</tr>';
    }
}else {
      $rowCols[] = '<tr><td colspan="3"></td></tr>';
      }
      
$rowCols = implode( '', $rowCols);

?>
<html>
<head>
<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
</head>
<body style="background-color:#f2f2f2; font-family: 'Montserrat', sans-serif;">
<h1 style="text-align:center; color:#000;">Trading Economics</h1> 
<h2 style="text-align:center; color:#000;">Credit Ratings for all countries</h2>  
<br>   
<table border="2px solid black" style="border-collapse: collapse; background-color:#fff;" align="center" width="80%" cellpadding="2" cellspacing-="3" >  
<tr>
      <th>Country</th>
      <th>TE</th>
      <th>TE_Outlook</th>
      <th>SP</th>
      <th>SP_Outlook</th>
      <th>Moodys</th>
      <th>Moodys_Outlook</th>
      <th>Fitch</th>
      <th>Fitch_Outlook</th>
      <th>DBRS</th>
      <th>DBRS_Outlook</th>
</tr>      
<tbody>
<?php echo $rowCols;?>
</tbody>
</table>
</body>
</html>

