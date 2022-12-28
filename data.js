require('dotenv').config();

const axios = require('axios')
const pool = require('./db');

axios.get('https://shop.maoup.com.tw/search.js?view=zenithify.si.handle.js&q=handle:s13-dog-food%20OR%20handle:s12-dog-food%20OR%20handle:go-%E4%BD%8E%E8%87%B4%E6%95%8F%E9%AE%AD%E9%AD%9A%E7%84%A1%E7%A9%80%E7%8A%AC%E7%B3%A7-%E5%85%A8%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:go-%E4%BD%8E%E8%87%B4%E6%95%8F%E7%81%AB%E9%9B%9E%E8%82%89%E7%84%A1%E7%A9%80%E7%8A%AC%E7%B3%A7-%E5%85%A8%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:now-%E9%AE%AE%E8%82%89%E7%84%A1%E7%A9%80%E5%A4%A9%E7%84%B6%E7%8A%AC%E7%B3%A7-%E5%B0%8F%E5%9E%8B%E6%88%90%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:go-%E4%BD%8E%E8%87%B4%E6%95%8F%E7%BE%8A%E8%82%89%E7%84%A1%E7%A9%80%E7%8A%AC%E7%B3%A7-%E5%85%A8%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:now-%E9%AE%AE%E9%AD%9A%E7%84%A1%E7%A9%80%E5%A4%A9%E7%84%B6%E7%8A%AC%E7%B3%A7-%E5%B0%8F%E5%9E%8B%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:now-%E7%B4%85%E8%82%89%E7%84%A1%E7%A9%80%E5%A4%A9%E7%84%B6%E7%8A%AC%E7%B3%A7-%E6%88%90%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:s11-dog-food%20OR%20handle:now-%E9%AE%AE%E9%AD%9A%E7%84%A1%E7%A9%80%E5%A4%A9%E7%84%B6%E7%8A%AC%E7%B3%A7-%E6%88%90%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:now-%E9%AE%AE%E8%82%89%E7%84%A1%E7%A9%80%E5%A4%A9%E7%84%B6%E7%8A%AC%E7%B3%A7-%E6%88%90%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:now-%E7%B4%85%E8%82%89%E7%84%A1%E7%A9%80%E5%A4%A9%E7%84%B6%E7%8A%AC%E7%B3%A7-%E5%B0%8F%E5%9E%8B%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:go-%E9%9B%9E%E8%82%89%E9%AE%AD%E9%AD%9A%E7%84%A1%E7%A9%80%E7%8A%AC%E7%B3%A7-%E8%80%81%E7%8A%AC%E6%B8%9B%E9%87%8D%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:go-%E4%BD%8E%E8%87%B4%E6%95%8F%E9%B4%A8%E8%82%89%E7%84%A1%E7%A9%80%E7%8A%AC%E7%B3%A7-%E5%85%A8%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:go-%E6%B5%B7%E6%B4%8B%E9%AE%AD%E9%B1%88%E7%84%A1%E7%A9%80%E7%8A%AC%E7%B3%A7-%E5%85%A8%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:go-%E9%9B%9E%E8%82%89%E9%AE%AD%E9%AD%9A%E7%84%A1%E7%A9%80%E7%8A%AC%E7%B3%A7-%E6%88%90%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:dry-pet-food-sample%20OR%20handle:halo-%E5%98%BF%E5%9B%89-%E6%96%B0%E9%AE%AE%E9%9B%9E%E8%82%89%E7%87%89%E8%B1%8C%E8%B1%86%E7%8A%AC%E7%B3%A7-%E5%B0%8F%E5%9E%8B%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:halo-%E5%98%BF%E5%9B%89-%E6%96%B0%E9%AE%AE%E7%99%BD%E9%AD%9A%E7%87%89%E7%81%AB%E9%9B%9E%E8%82%89%E7%84%A1%E7%A9%80%E7%8A%AC%E7%B3%A7-%E6%88%90%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:halo-%E5%98%BF%E5%9B%89-%E6%96%B0%E9%AE%AE%E7%81%AB%E9%9B%9E%E8%82%89%E7%87%89%E9%B4%A8%E8%82%89%E7%84%A1%E7%A9%80%E7%8A%AC%E7%B3%A7-%E4%BD%8E%E5%8D%A1%E9%85%8D%E6%96%B9%20OR%20handle:k9-natural-%E5%86%B7%E5%87%8D%E4%B9%BE%E7%87%A5%E7%8B%97%E7%8B%97%E7%94%9F%E9%A3%9F%E9%A4%90%20OR%20handle:%E5%BF%83%E9%9D%88%E9%9B%9E%E6%B9%AF-%E7%BE%8E%E5%9C%8B%E7%89%B9%E9%81%B8%E9%9B%9E%E8%82%89%E4%BD%90%E7%81%AB%E9%9B%9E%E8%82%89%E7%B6%93%E5%85%B8%E7%8A%AC%E7%B3%A7-%E5%B9%BC%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:%E5%B7%94%E5%B3%B0-ziwipeak-96%E9%AE%AE%E8%82%89%E7%8B%97%E7%B3%A7%20OR%20handle:%E5%BF%83%E9%9D%88%E9%9B%9E%E6%B9%AF-%E7%BE%8E%E5%9C%8B%E7%89%B9%E9%81%B8%E9%9B%9E%E8%82%89%E4%BD%90%E7%81%AB%E9%9B%9E%E8%82%89%E7%B6%93%E5%85%B8%E7%8A%AC%E7%B3%A7-%E7%86%9F%E9%BD%A1%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:%E5%BF%83%E9%9D%88%E9%9B%9E%E6%B9%AF-%E7%BE%8E%E5%9C%8B%E7%89%B9%E9%81%B8%E4%BD%8E%E8%84%82%E9%9B%9E%E8%82%89%E7%B6%93%E5%85%B8%E7%8A%AC%E7%B3%A7-%E4%BD%8E%E5%8D%A1%E9%AB%98%E7%BA%96%E9%85%8D%E6%96%B9%20OR%20handle:%E5%BF%83%E9%9D%88%E9%9B%9E%E6%B9%AF-%E5%A4%A7%E8%A5%BF%E6%B4%8B%E9%AE%AD%E9%AD%9A%E4%BD%90%E7%94%9C%E8%96%AF%E7%84%A1%E7%A9%80%E7%8A%AC%E7%B3%A7-%E5%85%A8%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:%E5%BF%83%E9%9D%88%E9%9B%9E%E6%B9%AF-%E9%87%8E%E9%A3%BC%E7%BE%8A%E8%82%89%E4%BD%90%E8%B1%8C%E8%B1%86%E7%84%A1%E7%A9%80%E7%8A%AC%E7%B3%A7-%E5%85%A8%E7%8A%AC%E9%85%8D%E6%96%B9%20OR%20handle:natural-balance-%E4%BD%8E%E6%95%8F%E7%84%A1%E7%A9%80%E5%9C%B0%E7%93%9C%E9%9B%9E%E8%82%89%E7%8A%AC%E7%B3%A7-%E6%88%90%E7%8A%AC%E9%85%8D%E6%96%B9%E5%B0%8F%E9%A1%86%E7%B2%92&_=1670399373823')
    .then(async (response) => {
        var data = await (response.data).substring(17, (response.data).length - 2);
        var res = await JSON.parse(data).results
        const conn = await pool.getConnection();

        for (var i = 0; i < res.length; i++) {
            var reg = new RegExp("[\u4E00-\u9FA5]+")
            var handleCut = res[i].handle.split('-');
            if (handleCut.length > 3) {
                if (reg.test(handleCut[1])) {
                    console.log("第二節是廠牌中文名") //例如halo-嘿囉-飼料名-配方
                    await conn.query("INSERT INTO allfoods2(`name`,brand,tags,price) VALUES (?,?,?,?)", [handleCut[2], `${handleCut[0] + " " + handleCut[1]}`, JSON.stringify(res[i].tags), `{\"https://shop.maoup.com.tw/collections/%E7%8B%97%E7%8B%97%E9%A3%BC%E6%96%99/products/${res[i].handle}\":${parseInt(res[i].price) / 100}}`])
                }
            } else {
                if (!reg.test(handleCut[1])) {
                    console.log("第二節是英文") //ex:巔峰-ziwi-飼料名
                    if (!reg.test(handleCut[2])) {
                        console.log("第三節是英文") //試用包，不取
                    } else {
                        await conn.query("INSERT INTO allfoods2(`name`,brand,tags,price) VALUES (?,?,?,?)", [handleCut[2], `${handleCut[1] + " " + handleCut[0]}`, JSON.stringify(res[i].tags), `{\"https://shop.maoup.com.tw/collections/%E7%8B%97%E7%8B%97%E9%A3%BC%E6%96%99/products/${res[i].handle}\":${parseInt(res[i].price) / 100}}`])
                    }
                } else {
                    await conn.query("INSERT INTO allfoods2(`name`,brand,tags,price) VALUES (?,?,?,?)", [handleCut[1], handleCut[0], JSON.stringify(res[i].tags), `{\"https://shop.maoup.com.tw/collections/%E7%8B%97%E7%8B%97%E9%A3%BC%E6%96%99/products/${res[i].handle}\":${parseInt(res[i].price) / 100}}`])
                }

            }
        }
    })