//+------------------------------------------------------------------+
//|                                                          te3.mq5 |
//|                        Copyright 2019, MetaQuotes Software Corp. |
//|                                             https://www.mql5.com |
//+------------------------------------------------------------------+
#property copyright "Copyright 2019, MetaQuotes Software Corp."
#property link      "https://www.mql5.com"
#property version   "1.00"
#include <EasyXML\EasyXml.mqh>
//+------------------------------------------------------------------+
//| Script program start function                                    |
//+------------------------------------------------------------------+
void OnStart()
  {
//---
   //API key
   string key = "Your_Key:Your_Secret";
   // Create object of class CEasyXml
   CEasyXml EasyXmlDocument;

// Set debugging
   EasyXmlDocument.setDebugging(false);

// Walking through the dom tree inline
   if(EasyXmlDocument.loadXmlFromUrl("https://api.tradingeconomics.com/calendar/country/united%20states?c="+key+"&format=xml"))
     {
      CEasyXmlNode *RootNode=EasyXmlDocument.getDocumentRoot();

      //iterate through root node
      for(int i=0; i<RootNode.Children().Total(); i++)
        {
         CEasyXmlNode *ChildNode=RootNode.Children().At(i);
         Print(IntegerToString(i)+" "+ChildNode.getName());

         //iterate through child nodes
         for(int j=0; j<ChildNode.Children().Total(); j++)
           {
            CEasyXmlNode *SubNode=ChildNode.Children().At(j);
            Print(IntegerToString(i)+"-"+IntegerToString(j)+"   "+SubNode.getName()+" | "+SubNode.getValue());
           }
        }
     }
     
     CEasyXmlNode *Node=EasyXmlDocument.getDocumentRoot();
     Print(Node.getName());

     CEasyXmlNode *ChildNode=Node.FirstChild();
     Print(ChildNode.getName());
     
     CEasyXmlNode *SubNode=ChildNode.Children().At(0);
     Print(IntegerToString(0)+"   "+SubNode.getName()+" | "+SubNode.getValue());
     
     for(int j=0; j<ChildNode.Children().Total(); j++)
           {
            CEasyXmlNode *SubNode=ChildNode.Children().At(j);
            Print("-"+IntegerToString(j)+"   "+SubNode.getName()+" | "+SubNode.getValue());
           }
           
           //here you can parse the data as you like
      
  }
//+------------------------------------------------------------------+
