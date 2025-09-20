import { doc } from "firebase/firestore";
import { createCursor } from "ghost-cursor";
import React, { useState, Fragment } from "react";
import toast from "react-hot-toast";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Data from "./dataExports";

const fetch = window.require("node-fetch2");
const path = window.require("node:path");
const findChrome = window.require("chrome-finder");
const os = window.require("os");
const userHomeDir = os.homedir();
const axios = window.require("axios");
const fs = window.require("fs");
const ChromeLauncher = window.require("chrome-launcher");
const CDP = window.require("chrome-remote-interface");
const { Webhook, MessageBuilder } = window.require("discord-webhook-node");
const { Logtail } = window.require("@logtail/node");

const logtail = new Logtail("YOUR_LOGTAIL_TOKEN_HERE");

export async function nikeMonitor(id, region) {
  var globalData = new Data();
  var TaskGroups = globalData.taskGroups();
  var WebhookURL = globalData.webhook().toString();

  var taskGroup;
  for (var i = 0; i < TaskGroups.length; i++) {
    if (TaskGroups[i].id == id) {
      taskGroup = TaskGroups[i];
    }
  }

  var productSku = taskGroup.product.sku;
  // var monitorURL = "https://api.nike.com/product_feed/threads/v2?filter=exclusiveAccess(true%2Cfalse)&filter=channelId(008be467-6c78-4079-94f0-70e2d6cc4003,%20010794e5-35fe-4e32-aaff-cd2c74f89d61,010794e5-35fe-4e32-aaff-cd2c74f89d61%2Cd9a5bc42-4b9c-4976-858a-f159cf99c647)&filter=marketplace(US)&filter=language(en)&filter=productInfo.merchProduct.styleColor("+productSku+")"
  var monitorURL = `https://api.nike.com/product_feed/threads/v2?filter=exclusiveAccess(true%2Cfalse)&filter=channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61%2Cd9a5bc42-4b9c-4976-858a-f159cf99c647%2C008be467-6c78-4079-94f0-70e2d6cc4003)&filter=marketplace(US%2C1681845278864)&filter=language(en)&filter=productInfo.merchProduct.styleColor(${productSku})`;

  changeStatus("Fetching Product..");
  var foundProduct = false;

  while (foundProduct == false) {
    var TaskGroups = globalData.taskGroups();
    var taskGroup;

    for (var i = 0; i < TaskGroups.length; i++) {
      if (TaskGroups[i].id == id) {
        taskGroup = TaskGroups[i];
      }
    }

    const countryValueChart = {
        "US":`https://api.nike.com/product_feed/threads/v2?filter=exclusiveAccess(true%2Cfalse)&filter=channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61,d9a5bc42-4b9c-4976-858a-f159cf99c647,008be467-6c78-4079-94f0-70e2d6cc4003,008be467-6c78-4079-94f0-70e2d6cc4003,%20010794e5-35fe-4e32-aaff-cd2c74f89d61,010794e5-35fe-4e32-aaff-cd2c74f89d61%2Cd9a5bc42-4b9c-4976-858a-f159cf99c647)&filter=marketplace(US)&filter=language(en)&filter=productInfo.merchProduct.styleColor(${productSku})`,
        "GB":`https://api.nike.com/product_feed/threads/v2?filter=exclusiveAccess(true%2Cfalse)&filter=channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61,d9a5bc42-4b9c-4976-858a-f159cf99c647,008be467-6c78-4079-94f0-70e2d6cc4003,008be467-6c78-4079-94f0-70e2d6cc4003,%20010794e5-35fe-4e32-aaff-cd2c74f89d61,010794e5-35fe-4e32-aaff-cd2c74f89d61%2Cd9a5bc42-4b9c-4976-858a-f159cf99c647)&filter=marketplace(GB)&filter=language(en-GB)&filter=productInfo.merchProduct.styleColor(${productSku})`,
        "FR":`https://api.nike.com/product_feed/threads/v2?filter=exclusiveAccess(true%2Cfalse)&filter=channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61,d9a5bc42-4b9c-4976-858a-f159cf99c647,008be467-6c78-4079-94f0-70e2d6cc4003,008be467-6c78-4079-94f0-70e2d6cc4003,%20010794e5-35fe-4e32-aaff-cd2c74f89d61,010794e5-35fe-4e32-aaff-cd2c74f89d61%2Cd9a5bc42-4b9c-4976-858a-f159cf99c647)&filter=marketplace(FR)&filter=language(fr)&filter=productInfo.merchProduct.styleColor(${productSku})`,
        "NZ":`https://api.nike.com/product_feed/threads/v2?filter=exclusiveAccess(true%2Cfalse)&filter=channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61,d9a5bc42-4b9c-4976-858a-f159cf99c647,008be467-6c78-4079-94f0-70e2d6cc4003,008be467-6c78-4079-94f0-70e2d6cc4003,%20010794e5-35fe-4e32-aaff-cd2c74f89d61,010794e5-35fe-4e32-aaff-cd2c74f89d61%2Cd9a5bc42-4b9c-4976-858a-f159cf99c647)&filter=marketplace(NZ)&filter=language(en-GB)&filter=productInfo.merchProduct.styleColor(${productSku})`,
        "AU":`https://api.nike.com/product_feed/threads/v2?filter=exclusiveAccess(true%2Cfalse)&filter=channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61,d9a5bc42-4b9c-4976-858a-f159cf99c647,008be467-6c78-4079-94f0-70e2d6cc4003,008be467-6c78-4079-94f0-70e2d6cc4003,%20010794e5-35fe-4e32-aaff-cd2c74f89d61,010794e5-35fe-4e32-aaff-cd2c74f89d61%2Cd9a5bc42-4b9c-4976-858a-f159cf99c647)&filter=marketplace(AU)&filter=language(en-GB)&filter=productInfo.merchProduct.styleColor(${productSku})`
    }
    console.log(region)
    var productSku = taskGroup.product.sku;
    if (productSku !== "") {
      try {
        var monitorURL;
        var fetchProduct;
        var res;
        var monitorURL = countryValueChart[region];
        // var monitorURL =  `https://snkrs.services.nike.com/snkrs/content/v1/?format=v5&exclusiveAccess=true%2Cfalse&language=en&marketplace=US&productInfo.merchProduct.styleColor=${productSku}`
        console.log(monitorURL);
        var fetchProduct = await fetch(monitorURL, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
          },
        });
        var fetchJson = await fetchProduct.json();
        var res = fetchJson;
        res = res.objects[res.objects.length - 1];

        const threadID = res.id;
        const productID =
          res.publishedContent.properties.products[0]["productId"];
        var productURL;
        var productName = "N/A";
        var productSlug = res.publishedContent.properties.seo.slug;
        try {
          var method =
            res.productInfo[res.productInfo.length - 1].launchView.method;
        } catch {
          method = "FLOW";
        }
        const site = fetchJson.objects[0].channelName;
        console.log(site);
        const price =
          res.productInfo[res.productInfo.length - 1].merchPrice.fullPrice;
        try {
          productName =
            res.productInfo[res.productInfo.length - 1].productContent
              .fullTitle;
        } catch {
          productName = res.publishedContent.properties.title;
        }
        if (site == "Nike.com") {
          productURL =
            `https://www.nike.com/${region.toLower()}/t/` +
            res.productInfo[0].productContent.slug +
            "/" +
            productSku;
        } else {
          productURL =
            `https://www.nike.com/${region.toLower()}/launch/t/` +
            res.publishedContent.properties.seo.slug;
        }
        const isoTime =
          res.productInfo[res.productInfo.length - 1].launchView.startEntryDate;
        var releaseTime = new Date(isoTime).getTime();
        var sizes = [];
        try {
          for (
            var p = 0;
            p < res.productInfo[res.productInfo.length - 1].skus.length;
            p++
          ) {
            sizes.push(
              res.productInfo[res.productInfo.length - 1].skus[p].nikeSize
            );
          }
        } catch (err) {
          console.log(err);
          sizes.push("N/A");
        }

        writeProduct(
          productName,
          threadID,
          productID,
          method,
          site,
          productURL,
          releaseTime,
          price,
          sizes
        );
        foundProduct = true;
        break;
      } catch (err) {
        console.log(err);
        changeStatus("Invalid Product..");
      }

      await new Promise((r) => setTimeout(r, 3333));
    }
  }

  async function writeProduct(
    name,
    threadId,
    productId,
    releaseMethod,
    site,
    productUrl,
    releaseData,
    price,
    sizes
  ) {
    var globalData = new Data();
    var TaskGroups = globalData.taskGroups();

    for (var i = 0; i < TaskGroups.length; i++) {
      if (TaskGroups[i].id == id) {
        var productURL;
        TaskGroups[i].title = name;
        TaskGroups[i].product.threadId = threadId;
        TaskGroups[i].product.productId = productId;
        TaskGroups[i].product.releaseMethod = releaseMethod;
        TaskGroups[i].product.site = site;
        TaskGroups[i].product.url = productUrl;
        TaskGroups[i].product.releaseDateIso = releaseData;
        TaskGroups[i].product.price = price;
        TaskGroups[i].product.sizes = sizes;
        TaskGroups[i].product.status = "Found Product";
        TaskGroups[
          i
        ].product.image = `https://secure-images.nike.com/is/image/DotCom/${productSku.replace(
          "-",
          "_"
        )}`;
        if (site == "Nike.com") {
          productURL =
            "https://www.nike.com/t/" + productSlug + "/" + productSku;
        } else {
          productURL = "https://www.nike.com/launch/t/" + productSlug;
        }
        TaskGroups[i].product.url = productURL;
      }
    }
    globalData.setTaskGroups(TaskGroups);
    toast.success(
      <span>
        Found Product: <b>{productName}</b>{" "}
      </span>,
      {
        style: {
          borderRadius: "10px",
          background: "#292938",
          color: "#fff",
        },
        icon: <MagnifyingGlassIcon className="w-5" />,
        duration: 5000,
      }
    );

    const hook3 = new Webhook(WebhookURL.toString());
    const embed3 = new MessageBuilder()
      .setTitle("Found Product")
      .setAuthor("Your App", "https://i.imgur.com/c2uryln.png", productURL)
      .addField("Monitor Input", productSku, false)
      .addField("Product Name", productName, false)
      .addField("Entry Method", method, false)
      .addField("Site", site, false)

      .addField(
        "Entry Start Date",
        `<t:${parseInt(releaseData) / 1000}>`,
        false
      )
      .addField("Pickup Time", "<t:" + parseInt(Date.now() / 1000) + ">")
      .setThumbnail(
        "https://secure-images.nike.com/is/image/DotCom/" +
          productSku.replace("-", "_")
      )
      .setColor("#e63245")
      .setDescription("Your group monitor has found a product.")
      .setFooter("Your App")
      .setTimestamp();

    hook3.send(embed3);

    var globalData = new Data();
    var TaskGroups = globalData.taskGroups();

    for (var i = 0; i < TaskGroups.length; i++) {
      if (TaskGroups[i].id == id) {
        TaskGroups[i].title = name;
      }
    }
    globalData.setTaskGroups(TaskGroups);
  }
  async function changeStatus(status) {
    console.log(status);
  }
}
