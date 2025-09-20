import toast from 'react-hot-toast';
import Data from "./dataExports"
const { Webhook,MessageBuilder } = window.require('discord-webhook-node');

const fetch = window.require("node-fetch2");

export async function fetchOrders(id) {
  

    const globalData = new Data();
    const webhook = globalData.webhook().toString();

    const accountData = globalData.accountData();
    const account = accountData.find((x) => x.id == id);

    if(account.authorization == undefined){
        toast.error("Run a Task!", {
            style: {
                borderRadius: '10px',
                background: '#292938',
                color: '#fff',
              },
        });
        return;
    }
    const loader = toast.loading("Fetching Orders..", {
        style: {
            borderRadius: '10px',
            background: '#292938',
            color: '#fff',
          },
          duration: 3000
    })
    try{
        const data = await fetch('https://api.nike.com/orders/history/v1?sort=orderSubmitDateDesc&country=US&language=en&giftcards=true&filter=orderType%28SALES_ORDER%29', {
        headers: {
            'authority': 'api.nike.com',
            'accept': 'application/json',
            'accept-language': 'en-US,en;q=0.9',
            'authorization': account.authorization,
            'nike-api-caller-id': 'com.nike:sse.orders',
            'origin': 'https://www.nike.com',
            'referer': 'https://www.nike.com/',
            'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
        }
        });
        if(data.status == 401){
            toast.error("Refresh Authorization!", {
                style: {
                    borderRadius: '10px',
                    background: '#292938',
                    color: '#fff',
                },
            });
            return;
        }
        const orderItems = (await data.json()).orderItems

        for(var i = 0; i<orderItems.length; i++){

            

            const itemTitle = orderItems[i].title
            const itemColor = orderItems[i].color
            const itemStatus = orderItems[i].lineItemStatus
            const itemSize = orderItems[i].size
            const itemSku = orderItems[i].styleColor
            const itemImage = orderItems[i].image
            try{
                var webLink = orderItems[i].actions.buyItAgain.webLink
            }
            catch{
                var webLink = "https://nike.com/orders"
            }
            const orderId = orderItems[i].orderid

            const orderDetails = await fetch(`https://api.nike.com/orders/history/v1/${orderId}?locale=en_us&country=US&language=en&timezone=America/Los_Angeles`, {
                headers: {
                    'authority': 'api.nike.com',
                    'accept': 'application/json',
                    'accept-language': 'en-US,en;q=0.9',
                    'authorization': account.authorization,
                    'nike-api-caller-id': 'com.nike:sse.orders',
                    'origin': 'https://www.nike.com',
                    'referer': 'https://www.nike.com/',
                    'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-site',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
                }
                });
            const orderDetailsJson = await orderDetails.json()
            console.log(orderDetailsJson)
            
            const paidPrice = (orderDetailsJson.transaction.chargedPrice).toString()
            const shippingAddress = orderDetailsJson.shipFrom.address.address1
            const email = orderDetailsJson.shipFrom.contactInformation.email
            const last4 = orderDetailsJson.payment[0].paymentDisplayNumber
            
            try{
                var shipmentTrackingUrl = orderDetailsJson.group[0].actions.trackShipment.webLink
            }
            catch{
                var shipmentTrackingUrl = "No Tracking Link"
            }

            console.log(paidPrice, shippingAddress, email, last4, shipmentTrackingUrl)

            const hook3 = new Webhook(webhook);
            const embed3 = new MessageBuilder()
                            .setTitle('Found Order')
                            .setURL(webLink)
                            .setAuthor('Your App', 'https://i.imgur.com/c2uryln.png', webLink)
                            .addField('Product', itemTitle + " - " + itemColor , false)
                            .addField('SKU', itemSku, true)
                            .addField('Size',itemSize, true)
                            .addField('Order Status', itemStatus, false)
                            .addField('Price', paidPrice, true)
                            .addField('Last 4 Card Digits', last4, true)
                            .addField('Email', "||" +  email + "||", false)
                            .addField('Shipping Address', "||" +  shippingAddress + "||", false)
                            .addField('Tracking Link', "||" + shipmentTrackingUrl + "||", false)



                            .setThumbnail(itemImage)
                            .setColor('#e63245')
                            // .setColor(itemStatusColor)
                            .setFooter("Your App")
                            .setTimestamp();
                            
                        hook3.send(embed3);
            toast.success(`Found Order: ${itemTitle}`, {
                style: {
                    borderRadius: '10px',
                    background: '#292938',
                    color: '#fff',
                },
            })
        }




    }


    catch(e){
        console.log(e)
        toast.error("Failed to Fetch Orders!", {
            style: {
                borderRadius: '10px',
                background: '#292938',
                color: '#fff',
              },
              duration: 3000
        })
    }
  
}
