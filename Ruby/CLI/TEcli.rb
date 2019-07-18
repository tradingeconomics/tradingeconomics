require 'tty-prompt'
require 'tty-font'
require 'tty-command'
require 'httparty'
require 'colorize'


prompt = TTY::Prompt.new
font = TTY::Font.new(:starwars)

#puts the title in starwars font type
puts font.write("     WELCOME TO").cyan
puts font.write("                   TRADING").cyan
puts font.write("ECONOMICS CLI!").cyan

#Starts by asking for client key
$ask = prompt.ask('Do you have a client key? y/n')
if $ask == 'y' || $ask =='Y'|| $ask =='yes'
    $client_key = prompt.mask("Your client key")
    puts "You are logged in!".green
elsif $ask == 'n'|| $ask =='N'|| $ask =='no'
    $client_key = 'guest:guest'
    puts "Whithout a client key, only a sample of data will be provided!".red
end        
#class that holds the method with the definition of the main menu
class Menu
    def menu
        prompt = TTY::Prompt.new
        $option = prompt.select("Choose one option:") do |menu|
            menu.choice 'Indicators'
            menu.choice 'Calendar'
            menu.choice 'Forecasts'
            menu.choice 'Markets'
            menu.choice 'News'
            menu.choice 'World Bank'
            menu.choice 'Comtrade'
            menu.choice 'Federal Reserve'
        end
    end    
end
#class that holds the method with the definition of the options menu
class Options
    def options
        prompt = TTY::Prompt.new
        #---------------------------------------------------Indicators-----------------------------------------------------
        if $option == 'Indicators'
            $ind = prompt.select("Which data do you want to retrieve?") do |menu|
                menu.choice "List of all indicators"
                menu.choice "List of indicators by country"
                menu.choice "Specific indicator for all countries"
                menu.choice "Specific indicator by ticker"
                menu.choice "Historical"
                menu.choice "Credit Rating"
                menu.choice "Latest Updates"       
            end
            if $ind == "List of all indicators"
                url = "https://api.tradingeconomics.com/indicators?c="+$client_key
            end
            if $ind == "List of indicators by country"
                $country = prompt.ask("type country or countries:", required: true)
                url = "https://api.tradingeconomics.com/country/"+$country+"?c="+$client_key
                
            end
            if $ind == "Specific indicator for all countries"
                $indicator = prompt.ask("type indicator or indicators(example: gdp):", required: true)
                url = "https://api.tradingeconomics.com/country/all/"+$indicator+"?c="+$client_key
                
            end
            if $ind == "Specific indicator by ticker"
                $ticker = prompt.ask("type ticker or tickers(example: usurtot):", required: true)
                url = "https://api.tradingeconomics.com/country/ticker/"+$ticker+"?c="+$client_key
            
            end
            if $ind == "Historical"
                $hist = prompt.select("Get from historical?") do |menu|
                    menu.choice "Specific country and indicator"
                    menu.choice "Specific country and indicator and start date"
                    menu.choice "Specific country and indicator between dates"
                    menu.choice "Get historical data by ticker"
                end
                if $hist == "Specific country and indicator" 
                    $country = prompt.ask("type country or countries:", required: true)  
                    $indicator = prompt.ask("type indicator or indicators(example: gdp):", required: true)    
                    url = "https://api.tradingeconomics.com/historical/country/"+$country+"/indicator/"+$indicator+"?c="+$client_key
                    
                end   
                if $hist == "Specific country and indicator and start date"
                    $country = prompt.ask("type country or countries:", required: true)  
                    $indicator = prompt.ask("type indicator or indicators(example: gdp):", required: true)    
                    $date1 = prompt.ask("put start date (date format is: YYYY-MM-DD):")do|q|
                        q.validate(/\d{4}-\d{2}-\d{2}/)
                        q.messages[:valid?] = 'invalid date format!'
                    end    
                    url = "https://api.tradingeconomics.com/historical/country/"+$country+"/indicator/"+$indicator+"/"+$date1+"?c="+$client_key
                
                end 
                if $hist == "Specific country and indicator between dates"
                    $country = prompt.ask("type country or countries:", required: true)  
                    $indicator = prompt.ask("type indicator or indicators(example: gdp, population):", required: true)    
                    $date1 = prompt.ask("put start date (date format is: YYYY-MM-DD):")do|q|
                    q.validate(/\d{4}-\d{2}-\d{2}/)
                    q.messages[:valid?] = 'invalid date format!'
                    end    
                    $date2 = prompt.ask("put end date (date format is: YYYY-MM-DD):")do|q| 
                    q.validate(/\d{4}-\d{2}-\d{2}/)
                    q.messages[:valid?] = 'invalid date format!'
                    end    
                    url = "https://api.tradingeconomics.com/historical/country/"+$country+"/indicator/"+$indicator+"/"+$date1+"/"+$date2+"?c="+$client_key
                    
                end 
                if $hist == "Get historical data by ticker"
                    $ticker = prompt.ask("type ticker or tickers(example: usurtot):", required: true)
                    $date1 = prompt.ask("put start date (date format is: YYYY-MM-DD):")do|q|
                    q.validate(/\d{4}-\d{2}-\d{2}/)
                    q.messages[:valid?] = 'invalid date format!'
                    end   
                    url = "https://api.tradingeconomics.com/historical/ticker/"+$ticker+"/"+$date1+"?c="+$client_key
                
                end 
            end
            if $ind == "Credit Rating"
                $rat = prompt.select("Get Credit Ratings?") do |menu|
                    menu.choice "List of Credit Ratings for all countries"
                    menu.choice "Credit Rating of the specific country"
                    menu.choice "Historical credit rating for one country"
                end 
                if $rat == "List of Credit Ratings for all countries"
                    url = "https://api.tradingeconomics.com/ratings?c="+$client_key   
                    
                end 
                if $rat == "Credit Rating of the specific country"
                    $country = prompt.ask("type country or countries:", required: true) 
                    url = "https://api.tradingeconomics.com/ratings/"+$country+"?c="+$client_key   
                    
                end   
                if $rat == "Historical credit rating for one country"
                    $country = prompt.ask("type country or countries:", required: true) 
                    url = "https://api.tradingeconomics.com/ratings/historical/"+$country+"?c="+$client_key   
                    
                end  
            end
            if $ind == "Latest Updates"
                $lat = prompt.select("Get Latest Updates?") do |menu|
                    menu.choice "Latest updates"
                    menu.choice "Updates since a specific date"            
                end 
                if $lat == "Latest updates"
                    url = "https://api.tradingeconomics.com/updates?c="+$client_key   
                    
                end 
                if $lat == "Updates since a specific date"
                    $date1 = prompt.ask("put start date (date format is: YYYY-MM-DD):")do|q|
                    q.validate(/\d{4}-\d{2}-\d{2}/)
                    q.messages[:valid?] = 'invalid date format!'
                    end    
                
                    url = "https://api.tradingeconomics.com/updates/"+$date1+"?c="+$client_key   
                    
                end   
            
            end
        end
        #----------------------------------------------------Calendar------------------------------------------------------
        if $option == 'Calendar'
            $cal = prompt.select("Which data do you want to retrieve?") do |menu|
                menu.choice "List of all Calendar events"
                menu.choice "Filter calendar events by date"
                menu.choice "Calendar events for specific country"
                menu.choice "Calendar events for specific country and dates"
                menu.choice "Calendar events for a specific indicator"
                menu.choice "Calendar events for a specific indicator and dates"
                menu.choice "Filter calendar events by calendar ID"
                menu.choice "Filter calendar events by ticker and date"
                menu.choice "Calendar events for a specific country and specific indicator"
                menu.choice "Calendar events for a specific country and specific indicator and dates"
            end
            if $cal == "List of all Calendar events"
                url = "https://api.tradingeconomics.com/calendar?c="+$client_key
            end
            if $cal == "Filter calendar events by date"
                $date1 = prompt.ask("put start date (date format is: YYYY-MM-DD):")do|q|
                q.validate(/\d{4}-\d{2}-\d{2}/)
                q.messages[:valid?] = 'invalid date format!'
                end    
                $date2 = prompt.ask("put end date (date format is: YYYY-MM-DD):")do|q| 
                q.validate(/\d{4}-\d{2}-\d{2}/)
                q.messages[:valid?] = 'invalid date format!'
                end 
                url = "https://api.tradingeconomics.com/calendar/country/All/"+$date1+"/"+$date2+"?c="+$client_key
                
            end
            if $cal == "Calendar events for specific country"
                $country = prompt.ask("type country or countries:", required: true)
                url = "https://api.tradingeconomics.com/calendar/country/"+$country+"?c="+$client_key
                
            end
            if $cal == "Calendar events for specific country and dates"
                $country = prompt.ask("type country or countries:", required: true)
                $date1 = prompt.ask("put start date (date format is: YYYY-MM-DD):")do|q|
                q.validate(/\d{4}-\d{2}-\d{2}/)
                q.messages[:valid?] = 'invalid date format!'
                end    
                $date2 = prompt.ask("put end date (date format is: YYYY-MM-DD):")do|q| 
                q.validate(/\d{4}-\d{2}-\d{2}/)
                q.messages[:valid?] = 'invalid date format!'
                end 
                url = "https://api.tradingeconomics.com/calendar/country/"+$country+"/"+$date1+"/"+$date2+"?c="+$client_key
            
            end
            if $cal == "Calendar events for a specific indicator"
                $indicator = prompt.ask("type indicator or indicators(example: inflation rate):", required: true)
                url = "https://api.tradingeconomics.com/calendar/indicator/"+$indicator+"?c="+$client_key
            end    
            if $cal == "Calendar events for a specific indicator and dates"
                $indicator = prompt.ask("type indicator or indicators(example: inflation rate):", required: true)
                $date1 = prompt.ask("put start date (date format is: YYYY-MM-DD):")do|q|
                q.validate(/\d{4}-\d{2}-\d{2}/)
                q.messages[:valid?] = 'invalid date format!'
                end    
                $date2 = prompt.ask("put end date (date format is: YYYY-MM-DD):")do|q| 
                q.validate(/\d{4}-\d{2}-\d{2}/)
                q.messages[:valid?] = 'invalid date format!'
                end 
                url = "https://api.tradingeconomics.com/calendar/indicator/"+$indicator+"/"+$date1+"/"+$date2+"?c="+$client_key
            
            end
            if $cal == "Calendar events for a specific country and specific indicator"
                $country = prompt.ask("type country or countries:", required: true)
                $indicator = prompt.ask("type indicator or indicators(example: initial jobless claims):", required: true)
                url = "https://api.tradingeconomics.com/calendar/country/"+$country+"/indicator/"+$indicator+"?c="+$client_key
            end      
            if $cal == "Calendar events for a specific country and specific indicator and dates"
                $country = prompt.ask("type country or countries:", required: true)
                $indicator = prompt.ask("type indicator or indicators(example: initial jobless claims):", required: true)
                $date1 = prompt.ask("put start date (date format is: YYYY-MM-DD):")do|q|
                q.validate(/\d{4}-\d{2}-\d{2}/)
                q.messages[:valid?] = 'invalid date format!'
                end    
                $date2 = prompt.ask("put end date (date format is: YYYY-MM-DD):")do|q| 
                q.validate(/\d{4}-\d{2}-\d{2}/)
                q.messages[:valid?] = 'invalid date format!'
                end 
                url = "https://api.tradingeconomics.com/calendar/country/"+$country+"/indicator/"+$indicator+"/"+$date1+"/"+$date2+"?c="+$client_key
            
            end
            if $cal == "Filter calendar events by calendar ID"
                $id = prompt.ask("type one or multiple ids(example: 174108, 160025, 160030):", required: true)
                url = "https://api.tradingeconomics.com/calendar/calendarid/"+$id+"?c="+$client_key
            
            end
            if $cal == "Filter calendar events by ticker and date"
                $ticker = prompt.ask("type ticker or tickers(example: IJCUSA, SPAINFACORD):", required: true)
                $date1 = prompt.ask("put start date (date format is: YYYY-MM-DD):")do|q|
                q.validate(/\d{4}-\d{2}-\d{2}/)
                q.messages[:valid?] = 'invalid date format!'
                end    
                $date2 = prompt.ask("put end date (date format is: YYYY-MM-DD):")do|q| 
                q.validate(/\d{4}-\d{2}-\d{2}/)
                q.messages[:valid?] = 'invalid date format!'
                end 
                url = "https://api.tradingeconomics.com/calendar/ticker/"+$ticker+"/"+$date1+"/"+$date2+"?c="+$client_key

            end
            
        end
        #---------------------------------------------------Forecasts------------------------------------------------------
        if $option == 'Forecasts'
            $forc = prompt.select("Which data do you want to retrieve?") do |menu|
                menu.choice "Forecast by country"
                menu.choice "Forecast by indicator"
                menu.choice "Forecast by specific ticker"
                menu.choice "Specific country and indicator"
                
            end
            if $forc == "Forecast by country"
                $country = prompt.ask("type country or countries(example: united states, china):", required: true)
                url = "https://api.tradingeconomics.com/forecast/country/"+$country+"?c="+$client_key
            end
            if $forc == "Forecast by indicator"
                $indicator = prompt.ask("type indicator or indicators(example: gdp):", required: true)
                url = "https://api.tradingeconomics.com/forecast/indicator/"+$indicator+"?c="+$client_key
                
            end
            if $forc == "Forecast by specific ticker"
                $ticker = prompt.ask("type ticker or tickers(example: usurtot, wgdpchin):", required: true)
                url = "https://api.tradingeconomics.com/forecast/ticker/"+$ticker+"?c="+$client_key
                
            end
            if $forc == "Specific country and indicator"
                $country = prompt.ask("type country or countries:", required: true)
                $indicator = prompt.ask("type indicator or indicators(example: gdp, population):", required: true)
                url = "https://api.tradingeconomics.com/forecast/country/"+$country+"/indicator/"+$indicator+"?c="+$client_key
            
            end
        end 
        #-----------------------------------------------------Markets-------------------------------------------------------

        if $option == 'Markets'
            $mark = prompt.select("Which data do you want to retrieve?") do |menu|
                menu.choice "Snapshots"
                menu.choice "Historical"
                menu.choice "Intraday"
                menu.choice "Earnings"
            end    
            #----------------------------------------------------------snapshots-----------------------------------------------------
            if $mark == "Snapshots"
                $snap = prompt.select("What kind of snapshot?") do |menu|
                    menu.choice "Commodities"
                    menu.choice "Major Currencies"
                    menu.choice "Stock Market Indexes"
                    menu.choice "Government Bonds"
                    menu.choice "Markets by specific symbol"
                    menu.choice "Market lists"
                    menu.choice "Search"
                end
                if $snap == "Commodities"
                    url = "https://api.tradingeconomics.com/markets/commodities?c="+$client_key
                end    
                if $snap == "Major Currencies"
                    url = "https://api.tradingeconomics.com/markets/currency?c="+$client_key
                end  
                if $snap == "Stock Market Indexes"
                    url = "https://api.tradingeconomics.com/markets/index?c="+$client_key
                end   
                if $snap == "Government Bonds"
                    url = "https://api.tradingeconomics.com/markets/bond?c="+$client_key
                end 
                if $snap == "Markets by specific symbol"
                    $symbol = prompt.ask("type symbol or symbols(example: aapl:us, indu:ind):", required: true)
                    url = "https://api.tradingeconomics.com/markets/symbol/"+$symbol+"?c="+$client_key
                end
            end
            #----------------------------------------------------------Snapshots Lists-----------------------------------------------------
            if $snap == "Market lists"
                $list = prompt.select("What are the lists?") do |menu|
                menu.choice "A snapshot of latest peers prices by market"
                menu.choice "Stock Market Index Components"
                menu.choice "Stock Market by country and page number"
                end 
                if $list == "A snapshot of latest peers prices by market"
                    $symbol = prompt.ask("type symbol or symbols(example: aapl:us):", required: true)
                    url = "https://api.tradingeconomics.com/markets/peers/"+$symbol+"?c="+$client_key
                end    
                if $list == "Stock Market Index Components"
                    $symbol = prompt.ask("type symbol or symbols(example: psi20:ind):", required: true)
                    url = "https://api.tradingeconomics.com/markets/components/"+$symbol+"?c="+$client_key
                end 
                if $list == "Stock Market by country and page number"
                    $country = prompt.ask("type country:", required: true)
                    $page = prompt.ask("put page number here:") do |a|
                    a.validate(/^-?[0-9]+$/)
                    a.messages[:valid?] = 'must type a valid number!'
                    end    
                    url = "https://api.tradingeconomics.com/markets/country/"+$country+"?c="+$client_key+"&page="+$page
                end
            end
            #----------------------------------------------------------Snapshots search-----------------------------------------------------     
            if $snap == "Search"
                $search = prompt.select("The search will look into the categories: Indexes, stocks, bonds, and commodities") do |menu|
                    menu.choice "Search method by country"
                    menu.choice "Filtering by Category"
                    menu.choice "Search with pagination"
                end 
                if $search == "Search method by country"
                    $country = prompt.ask("type country:", required: true)
                    url = "https://api.tradingeconomics.com/markets/search/"+$country+"?c="+$client_key
                end  
                if $search == "Filtering by Category"
                    $country = prompt.ask("type country:", required: true)
                    $category = prompt.ask("Type category(example: index, markets):", required: true)
                    url = "https://api.tradingeconomics.com/markets/search/"+$country+"?category="+$category+"&c="+$client_key
                end
                if $search == "Search with pagination"
                    $country = prompt.ask("type country:", required: true)
                    $category = prompt.ask("Type category(example: index,markets):", required: true)
                    $page = prompt.ask("put page number here:") do |a| 
                    a.validate(/^-?[0-9]+$/)
                    a.messages[:valid?] = 'must type a valid number!'
                    end   
                    url = "https://api.tradingeconomics.com/markets/country/"+$country+"?category="+$category+"&page="+$page+"&c="+$client_key
                end
            end
            #----------------------------------------------------------Historical-----------------------------------------------------          
            if $mark == "Historical"
                $hist = prompt.select("Get markets historical data") do |menu|
                    menu.choice "Historical markets data by market"
                    menu.choice "Filter historical markets data by date"
                    menu.choice "Filter historical markets data between dates"
                end 
                if $hist == "Historical markets data by market"
                    $symbol = prompt.ask("type symbol or symbols(example: aapl:us, indu:ind):", required: true)
                    url = "https://api.tradingeconomics.com/markets/historical/"+$symbol+"?c="+$client_key
                end
                if $hist == "Filter historical markets data by date"
                    $symbol = prompt.ask("type symbol or symbols(example: aapl:us):", required: true)
                    $date1 = prompt.ask("put start date (date format is: YYYY-MM-DD):")do|q|
                    q.validate(/\d{4}-\d{2}-\d{2}/)
                    q.messages[:valid?] = 'invalid date format!'
                    end 
                    url = "https://api.tradingeconomics.com/markets/historical/"+$symbol+"?d1="+$date1+"&c="+$client_key
                end  
                if $hist == "Filter historical markets data between dates"
                    $symbol = prompt.ask("type symbol or symbols(example: aapl:us):", required: true)
                    $date1 = prompt.ask("put start date (date format is: YYYY-MM-DD):")do|q|
                    q.validate(/\d{4}-\d{2}-\d{2}/)
                    q.messages[:valid?] = 'invalid date format!'
                    end 
                    $date2 = prompt.ask("put end date (date format is: YYYY-MM-DD):")do|q|
                    q.validate(/\d{4}-\d{2}-\d{2}/)
                    q.messages[:valid?] = 'invalid date format!'
                    end 
                    url = "https://api.tradingeconomics.com/markets/historical/"+$symbol+"?d1="+$date1+"&d2="+$date2+"&c="+$client_key
                end
            end 
            #----------------------------------------------------------Intraday-----------------------------------------------------          
            if $mark == "Intraday"
                $int = prompt.select("Get markets intraday data") do |menu|
                    menu.choice "Intraday prices for a single market"
                    menu.choice "Filter intraday prices by date and hour"
                    menu.choice "Filter intraday prices by date"
                    end
                    if $int == "Intraday prices for a single market"
                        $symbol = prompt.ask("type symbol(example: aapl:us):", required: true)
                        url = "https://api.tradingeconomics.com/markets/intraday/"+$symbol+"?c="+$client_key
                    end 
                    if $int == "Filter intraday prices by date and hour"
                        $symbol = prompt.ask("type symbol(example: aapl:us):", required: true)
                        $date_time = prompt.ask("put date here (date format is: YYYY-MM-DD):")do|q|
                        q.validate(/\d{4}-\d{2}-\d{2}/)
                        q.messages[:valid?] = 'invalid date format!'
                        end
                        $hour = prompt.ask("put time here (Time format is: HH:MM):", required: true)  
                        url = "https://api.tradingeconomics.com/markets/intraday/"+$symbol+"?d1="+$date_time+$hour+"&c="+$client_key
                    end
                    if $int == "Filter intraday prices by date"
                        $symbol = prompt.ask("type symbol(example: aapl:us):")
                        $date1 = prompt.ask("put start date (date format is: YYYY-MM-DD):")do|q|
                        q.validate(/\d{4}-\d{2}-\d{2}/)
                        q.messages[:valid?] = 'invalid date format!'
                        end
                        $date2 = prompt.ask("put end date (date format is: YYYY-MM-DD):")do|q|
                        q.validate(/\d{4}-\d{2}-\d{2}/)
                        q.messages[:valid?] = 'invalid date format!'
                        end 
                        url = "https://api.tradingeconomics.com/markets/intraday/"+$symbol+"?d1="+$date1+"&d2="+$date2+"&c="+$client_key
                end 
            end
            #----------------------------------------------------------Earnings-----------------------------------------------------          
            if $mark == "Earnings"
                $earn = prompt.select("Get earnings data") do |menu|
                    menu.choice "Default earnings calendar"
                    menu.choice "Earnings calendar by date"
                    menu.choice "Filter earnings calendar by market and start date"
                    menu.choice "Filter earnings calendar by market in a date range"
                    menu.choice "Filter earnings calendar by country"
                    menu.choice "Filter earnings by type"
                end
                if $earn == "Default earnings calendar"            
                    url = "https://api.tradingeconomics.com/earnings?c="+$client_key
                end
                if $earn == "Earnings calendar by date"
                    $date1 = prompt.ask("put start date (date format is: YYYY-MM-DD):")do|q|
                    q.validate(/\d{4}-\d{2}-\d{2}/)
                    q.messages[:valid?] = 'invalid date format!'
                    end 
                    url = "https://api.tradingeconomics.com/earnings?d1="+$date1+"&c="+$client_key
                end
                if $earn == "Filter earnings calendar by market and start date"
                    $symbol = prompt.ask("type symbol(example: aapl:us):", required: true)
                    $date1 = prompt.ask("put start date (date format is: YYYY-MM-DD):")do|q|
                    q.validate(/\d{4}-\d{2}-\d{2}/)
                    q.messages[:valid?] = 'invalid date format!'
                    end 
                    url = "https://api.tradingeconomics.com/earnings/symbol/"+$symbol+"?d1="+$date1+"&c="+$client_key
                end
                if $earn == "Filter earnings calendar by market in a date range"
                    $symbol = prompt.ask("type symbol(example: msft:us):", required: true)
                    $date1 = prompt.ask("put start date (date format is: YYYY-MM-DD):")do|q|
                    q.validate(/\d{4}-\d{2}-\d{2}/)
                    q.messages[:valid?] = 'invalid date format!'
                    end 
                    $date2 = prompt.ask("put end date (date format is: YYYY-MM-DD):")do|q|
                    q.validate(/\d{4}-\d{2}-\d{2}/)
                    q.messages[:valid?] = 'invalid date format!'
                    end 
                    url = "https://api.tradingeconomics.com/earnings/symbol/"+$symbol+"?d1="+$date1++"?d2="+$date2+"&c="+$client_key
                end
                if $earn == "Filter earnings calendar by country"
                    $country = prompt.ask("put country or countries:", required: true)
                    url = "https://api.tradingeconomics.com/earnings/country/"+$country+"?c="+$client_key
                end
                if $earn == "Filter earnings by type"
                    $type = prompt.ask("Type can be earnings, ipo and dividends:", required: true)   
                    url = "https://api.tradingeconomics.com/earnings?c="+$client_key+"&type="+$type
                end
            end                    
        end
        #----------------------------------------------------------News-----------------------------------------------------  
        if $option == "News"
            $news = prompt.select("Which news do you want to see?") do |menu|
                menu.choice "Latest news"
                menu.choice "News by country"
                menu.choice "News by indicator"
                menu.choice "News by country and indicator"
                menu.choice "Paginate news list by specifying start index and list size"
                menu.choice "Latest Articles"       
            end
            if $news == "Latest news"
                url = "https://api.tradingeconomics.com/news?c="+$client_key
            end
            if $news == "News by country"
                $country = prompt.ask("type country or countries:", required: true)
                url = "https://api.tradingeconomics.com/news/country/"+$country+"?c="+$client_key
            end
            if $news == "News by indicator"
                $indicator = prompt.ask("type indicator or indicators(example:inflation rate, interest rate...):", required: true)
                url = "https://api.tradingeconomics.com/news/indicator/"+$indicator+"?c="+$client_key
            end
            if $news == "News by country and indicator"
                $country = prompt.ask("type country or countries:", required: true)
                $indicator = prompt.ask("type indicator or indicators(example: inflation rate):", required: true)
                url = "https://api.tradingeconomics.com/news/country/"+$country+"/"+$indicator+"?c="+$client_key
            end
            if $news == "Paginate news list by specifying start index and list size"
                $limit = prompt.ask("type limit number for list size:")do |a|
                a.validate(/^-?[0-9]+$/)
                a.messages[:valid?] = 'must type a valid number!'
                end 
                $start = prompt.ask("type start index number:") do |a|
                a.validate(/^-?[0-9]+$/)
                a.messages[:valid?] = 'must type a valid number!'
                end 
                url = "https://api.tradingeconomics.com/news?c="+$client_key+"&limit="+$limit+"&start="+$start
            end
            if $news == "Latest Articles"
                $articles = prompt.select("Which articles do you want to see?") do |menu|
                    menu.choice "Latest articles"
                    menu.choice "Latest articles by country"
                    menu.choice "Articles by country within date interval"
                    menu.choice "Latest articles by indicator"
                    menu.choice "Latest articles by country and indicator"
                    menu.choice "Article by ID"       
                    menu.choice "Paginate articles list by specifying start index and list size"       
                end
                if $articles == "Latest articles"
                    url = "https://api.tradingeconomics.com/articles?c="+$client_key
                end
                if $articles == "Latest articles by country"
                    $country = prompt.ask("type country or countries:", required: true)
                    url = "https://api.tradingeconomics.com/articles/country/"+$country+"?c="+$client_key
                end
                if $articles == "Articles by country within date interval"
                    $country = prompt.ask("type country or countries:", required: true)
                    $date1 = prompt.ask("put start date (date format is: YYYY-MM-DD):")do|q|
                    q.validate(/\d{4}-\d{2}-\d{2}/)
                    q.messages[:valid?] = 'invalid date format!'
                    end 
                    $date2 = prompt.ask("put end date (date format is: YYYY-MM-DD):")do|q|
                    q.validate(/\d{4}-\d{2}-\d{2}/)
                    q.messages[:valid?] = 'invalid date format!'
                    end 
                    url = "https://api.tradingeconomics.com/articles/country/"+$country+"/from/"+$date1+"/"+$date2+"?c="+$client_key
                end
                if $articles == "Latest articles by indicator"
                    $indicator = prompt.ask("type indicator or indicators(example: interest rate):", required: true)
                    url = "https://api.tradingeconomics.com/articles/indicator/"+$indicator+"?c="+$client_key
                end
                if $articles == "Latest articles by country and indicator"
                    $country = prompt.ask("type country or countries:", required: true)
                    $indicator = prompt.ask("type indicator or indicators(example: interest rate):", required: true)
                    url = "https://api.tradingeconomics.com/articles/country/"+$country+"/"+$indicator+"?c="+$client_key
                end
                if $articles == "Article by ID" 
                    $id = prompt.ask("type id or ids(example: 20580):") do |a|
                    a.validate(/^-?[0-9]+$/)
                    a.messages[:valid?] = 'must type a valid number!'
                    end 
                    url = "https://api.tradingeconomics.com/articles/id/"+$id+"?c="+$client_key
                end
                if $articles == "Paginate articles list by specifying start index and list size"
                    $limit = prompt.ask("type limit number for list size:") do |a|
                    a.validate(/^-?[0-9]+$/)
                    a.messages[:valid?] = 'must type a valid number!'
                    end    
                    $start = prompt.ask("type start index number:")do |a|
                    a.validate(/^-?[0-9]+$/)
                    a.messages[:valid?] = 'must type a valid number!'
                    end 
                    url = "https://api.tradingeconomics.com/news?c="+$client_key+"&lim="+$limit+"&start="+$start
                end
            end
        end        
        #-----------------------------------------------------World Bank----------------------------------------------------  
        if $option == "World Bank"
            $wb = prompt.select("Which data do you want to retreive?") do |menu|
                menu.choice "Category"
                menu.choice "Indicators and countries"
                menu.choice "Historical"           
            end
            if $wb == "Category"
                $wbCat = prompt.select("Which data do you want to retreive?") do |menu|
                    menu.choice "Main categories"
                    menu.choice "Filtering by categories"
                    menu.choice "Filtering by categories and page number"
                end    
                if $wbCat == "Main categories"
                    url = "https://api.tradingeconomics.com/worldBank/categories?c="+$client_key
                end
                if $wbCat == "Filtering by category"
                    $category = prompt.ask("type category or categories(example: Education):", required: true)
                    url = "https://api.tradingeconomics.com/worldBank/category/"+$category+"?c="+$client_key
                end
                if $wbCat == "Filtering by categories and page number"
                    $category = prompt.ask("type category or categories(example: Education):", required: true)
                    $page = prompt.ask("type page number:") do |a|
                    a.validate(/^-?[0-9]+$/)
                    a.messages[:valid?] = 'must type a valid number!'
                    end
                    url = "https://api.tradingeconomics.com/worldBank/category/"+$category+"/"+$page+"?c="+$client_key
                end
            end 
            if $wb == "Indicators and countries"
                $wbInd = prompt.select("Which data do you want to retreive?") do |menu|
                    menu.choice "Specific indicator for all countries using a series code"
                    menu.choice "Specific country and page number"
                    menu.choice "Detailed information using url"
                end
                if $wbInd == "Specific indicator for all countries using a series code"
                    $series_code = prompt.ask("type series code(example: fr.inr.rinr):", required: true)
                    url = "https://api.tradingeconomics.com/worldBank/indicator?c="+$client_key+"&s="+$series_code
                end
                if $wbInd == "Specific country and page number"
                    $country = prompt.ask("type series code(example: fr.inr.rinr):", required: true)
                    $page = prompt.ask("type page number:") do |a|
                        a.validate(/^-?[0-9]+$/)
                        a.messages[:valid?] = 'must type a valid number!'
                    end
                    url = "https://api.tradingeconomics.com/worldBank/country/"+$country+"/"+$page+"?c="+$client_key
                end
                if $wbInd == "Detailed information using url"
                    $url = prompt.ask("type url(example: /united-states/real-interest-rate-percent-wb-data.html):", required: true)
                    url = "https://api.tradingeconomics.com/worldBank/indicator?c="+$client_key+"&url="+$url
                end    
            end
            if $wb == "Historical"       
                $series_code = prompt.ask("type series code(example: fr.inr.rinr):", required: true)
                url = "https://api.tradingeconomics.com/worldBank/historical?c="+$client_key+"&s="+$series_code
            end
        end
        #--------------------------------------------------------Comtrade----------------------------------------------------   
        
        if $option == "Comtrade"
            $com = prompt.select("Which Comtrade data do you want to get?") do |menu|
                menu.choice "Category"
                menu.choice "Country"
                menu.choice "Historical"           
            end 
           
            if $com == "Category"
                url = "https://api.tradingeconomics.com/comtrade/categories?c="+$client_key
            end 
            
            if $com == "Country"
                $comc = prompt.select("What do you want to get?") do |menu|
                    menu.choice "Get detailed information about Comtrade countries"    
                    menu.choice "Snapshot of data per country"    
                    menu.choice "Snapshot of data per country and page number"    
                    menu.choice "Snapshot of trade between two countries with pagination" 
                end
                if $comc ==  "Get detailed information about Comtrade countries" 
                    url = "https://api.tradingeconomics.com/comtrade/countries?c="+$client_key  
                end
                if $comc == "Snapshot of data per country" 
                    $country = prompt.ask("type one country:", required: true)
                    url = "https://api.tradingeconomics.com/comtrade/country/"+$country+"?c="+$client_key
                end 
                if $comc == "Snapshot of data per country and page number"
                    $country = prompt.ask("type one country:", required: true)
                    $page = prompt.ask("type page number:") do |a|
                        a.validate(/^-?[0-9]+$/)
                        a.messages[:valid?] = 'must type a valid number!'
                    end
                    url = "https://api.tradingeconomics.com/comtrade/country/"+$country+"/"+$page+"?c="+$client_key
                end 
                if $comc == "Snapshot of trade between two countries with pagination"
                    $country1 = prompt.ask("type first country:", required: true)
                    $country2 = prompt.ask("type second country:", required: true)
                    $page = prompt.ask("type page number:") do |a|
                        a.validate(/^-?[0-9]+$/)
                        a.messages[:valid?] = 'must type a valid number!'
                    end
                    url = "https://api.tradingeconomics.com/comtrade/country/"+$country1+"/"+$country2+"/"+$page+"?c="+$client_key
                end
            end     
            if $com == "Historical"
                $symbol = prompt.ask("type symbol or symbols(example: PRTESP24031):", required: true)  
                url = "https://api.tradingeconomics.com/comtrade/historical/"+$symbol+"?c="+$client_key
            end
        end 
        #-------------------------------------------------Federal Reserve----------------------------------------------------   
        if $option == "Federal Reserve"
            $fed = prompt.select("Which data do you want to retreive?") do |menu|
                menu.choice "List of all US states"
                menu.choice "List of all counties per state"
                menu.choice "Snapshots"           
                menu.choice "Historical"           
            end
            if $fed == "List of all US states"
                url =   "https://api.tradingeconomics.com/fred/states?c="+$client_key  
            end
            if $fed ==  "List of all counties per state"
                $county = prompt.ask("type county here(example: arkansas):", required: true)
                url =  "https://api.tradingeconomics.com/fred/counties/"+$county+"?c="+$client_key
            end
            if $fed == "Snapshots"  
                $fed_snap = prompt.select("Which data do you want to retreive?") do |menu|
                    menu.choice "Symbol"
                    menu.choice "URL"
                    menu.choice "Country"           
                    menu.choice "State"           
                    menu.choice "County"          
                    menu.choice "Pagination"          
                end
                if $fed_snap ==  "Symbol"
                    $symbol = prompt.ask("put symbol here(example: AGEXMAK2A647NCEN):", required: true)
                    url =  "https://api.tradingeconomics.com/fred/snapshot/symbol/"+$symbol+"?c="+$client_key
                end
                if $fed_snap ==  "URL"
                    $url = prompt.ask("put url here(example: /united-states/income-inequality-in-aleutians-east-borough-ak-fed-data.html):", required: true)
                    url =  "https://api.tradingeconomics.com/fred/snapshot/url?c="+$client_key+"&url="+$url
                end 
                if $fed_snap ==  "Country" 
                    $country = prompt.ask("put country here:", required: true)
                    url =  "https://api.tradingeconomics.com/fred/snapshot/country/"+$country+"?c="+$client_key
                end
                if $fed_snap ==  "State" 
                    $state = prompt.ask("put state name here(example: tennessee):", required: true)
                    url =  "https://api.tradingeconomics.com/fred/snapshot/state/"+$state+"?c="+$client_key
                end
                if $fed_snap ==  "County"   
                    $county = prompt.ask("put county name here(example: arkansas):", required: true)
                    url =  "https://api.tradingeconomics.com/fred/snapshot/county/"+$county+"?c="+$client_key
                end 
                if $fed_snap ==  "Pagination"    
                    $country = prompt.ask("put country name here:", required: true)
                    $page = prompt.ask("type page number:") do |a|
                        a.validate(/^-?[0-9]+$/)
                        a.messages[:valid?] = 'must type a valid number!'
                    end
                    url =  "https://api.tradingeconomics.com/fred/snapshot/county/"+$country+"/"+$page+"?c="+$client_key
                end 
            end
            if $fed == "Historical"
                $symbol = prompt.ask("put symbol or symbols(example: RACEDISPARITY005007, 2020RATIO002013):", required: true)
                    url =  "https://api.tradingeconomics.com/fred/historical/"+$symbol+"?c="+$client_key 
                
            end               
        end
     
    #uses httparty to make requests and puts response    
    url = url.gsub(' ', '%20')
    response = HTTParty.get(url)
    response.code
    response.body
    puts response.body.yellow   
    end  
end 

#get back to the main menu, if you press n the program exits
while prompt.yes?("continue?") 
    menu = Menu.new
    options = Options.new 

    menu.menu
    options.options

end
    





