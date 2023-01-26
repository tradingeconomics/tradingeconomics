using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CSharpExamples
{
    class Streamer
    {
        /// <summary>
        /// Store the client key to be used through the program
        /// </summary>
        static string _clientKey = "guest:guest";

        static void Main(string[] args)
        {
            // set the client key
            Console.WriteLine("Provide a API key; otherwise, press ENTER to use the default test key...");
            string k = Console.ReadLine();
            if (!string.IsNullOrWhiteSpace(k))
                _clientKey = k;

            Console.WriteLine("Enter a topic (ex EURUSD:CUR,calendar): ");


            string topic  = Console.ReadLine();
 
            Console.WriteLine("Subscribing to " + topic);

            Console.WriteLine("About to connect the socket!");

            // this method receives as paramenter the name of the topic you are subscribing for
            // for a complete reference, refer to: http://docs.tradingeconomics.com/ searching for STREAMING
            RunStreamer(topic).Wait();

            Console.WriteLine("Connection closed, press any key to exit...");
            Console.ReadLine();
        }

        /// <summary>
        /// Connects with the TE Streaming throught a WebSocket keep receiving the information from TE while
        /// the connection is open.
        /// This method should be running in a separate thread since it would block the program flow while running.
        /// </summary>
        /// <param name="subscribeTo">Name of the topic to subscribe</param>
        public static async Task RunStreamer(string subscribeTo)
        {
            try
            {
                using (var cws = new ClientWebSocket())
                {
                    await cws.ConnectAsync(new Uri($"wss://stream.tradingeconomics.com/?client={_clientKey}"), CancellationToken.None);

                    if (cws.State == WebSocketState.Open)
                    {
                        var buffer = new ArraySegment<byte>(Encoding.UTF8.GetBytes(@"{""topic"": ""subscribe"", ""to"": """ + subscribeTo + @""" }"));
                        await cws.SendAsync(buffer, WebSocketMessageType.Binary, true, CancellationToken.None);
                    }

                    await Task.Delay(1024);

                    while (cws.State == WebSocketState.Open)
                    {
                        var buffer = new ArraySegment<byte>(new byte[1024]);
                        var result = await cws.ReceiveAsync(buffer, CancellationToken.None);
                        if (result.MessageType == WebSocketMessageType.Close)
                        {
                            await cws.CloseAsync(WebSocketCloseStatus.NormalClosure, string.Empty, CancellationToken.None);
                        }

                        Console.WriteLine($"Receiving: {Encoding.UTF8.GetString(buffer.Array, 0, result.Count).Trim()}");
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error with message: {e.Message}");
            }
        }
    }
}
