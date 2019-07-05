require 'httparty'


puts "put your client key"
$name = STDIN.gets
puts "you are logged in as " +$name

puts "Choose commodities, currency, index or bond"
$snap = STDIN.gets


url= "https://api.tradingeconomics.com/markets/"+$snap.strip+"?c="+$name.strip


response = HTTParty.get(url)

response.code

response.body

puts response.body



