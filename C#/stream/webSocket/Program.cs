using System;
using WebSocketSharp;

namespace webSocket
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var ws = new WebSocket("ws://stream.tradingeconomics.com/?client=guest:guest"))
            {
                ws.OnMessage += (sender, e) =>
                    Console.WriteLine("Receiving : " + e.Data);

                ws.Connect(); //Connecting to the websocket

                Console.WriteLine("Connected to the socket");

                //Calendar is not frequent, need to wait until the data comes
                ws.Send("{\"topic\": \"subscribe\", \"to\": \"calendar\" }"); //Subscribing to the calendar

                Console.ReadKey(true);

            }
        }
    }
}
