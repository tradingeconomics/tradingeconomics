/*
    * Below two Libraries are require to run this example
    * javax.websocket-client-api.1.1.jar
    * tyrus-standalone-client-1.9.jar
*/

package streaming;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Scanner;

/**
 *
 * @author Tradingeconomics
 */
public class Streaming {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        
        try {
            // open websocket
            final WebsocketClient client = new WebsocketClient(new URI("wss://stream.tradingeconomics.com/?client=guest:guest"));
            
            // add listener
            client.addMessageHandler(new WebsocketClient.MessageHandler() {
                public void handleMessage(String message) {
                    System.out.println("Receiving: " + message);
                }
            });
            
            Scanner scan = new Scanner(System.in);   
            System.out.println("Enter topic for subscription: "); 

            while(scan.hasNext()) {
                // reading entered value
                String to = scan.nextLine();
                       
                // create object variable for subscription
                String subs = "{\"topic\": \"subscribe\", \"to\": \"" + to + "\" }";
            
                // send message to websocket
                client.sendMessage(subs);
            }
            
            // wait 30 seconds for messages from websocket
            Thread.sleep(30000);

        } catch (InterruptedException ex) {
            System.err.println("InterruptedException exception: " + ex.getMessage());
        } catch (URISyntaxException ex) {
            System.err.println("URISyntaxException exception: " + ex.getMessage());
        }
        
    }
    
}
