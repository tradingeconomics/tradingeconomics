using System;
using WebSocketSharp;

namespace webSocket
{
    class Program
    {
        static void Main(string[] args)
        {
            //only a single market topic "EURUSD:CUR" can subscribe using guest:guest
            //For other markets or calendar topic "key:secret" is required
            using (var ws = new WebSocket("ws://stream.tradingeconomics.com/?client=guest:guest"))
            {

                ws.OnMessage += (sender, e) =>
                    Console.WriteLine("Receiving : " + e.Data); //Streaming data

                ws.Connect(); //Connecting to the websocket

                Console.WriteLine("Connected to the socket");

                //Calendar is not frequent, need to wait until the data comes
                //Use your "key:secret" to receive calendar streaming data
                ws.Send("{\"topic\": \"subscribe\", \"to\": \"calendar\" }"); //Subscribing the topic named calendar

                Console.ReadKey(true);

            }
        }
    }
}
