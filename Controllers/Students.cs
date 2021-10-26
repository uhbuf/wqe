using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace Project1.Controllers
{
    
    public class Students : Controller
    { 
        private readonly ILogger<Students> _logger;

        public Students(ILogger<Students> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public ActionResult Get(string word)
        {
            List<String> chastRechi = new List<String>();
            List<String> del = new List<String>();
            Dictionary<String, List<String>> result = new Dictionary<String, List<String>>();
            string url = ($"https://learnersdictionary.com/definition/{word}");
            var hhtpClient = new HttpClient();
            var resp = hhtpClient.GetAsync(url).Result;
            var html = resp.Content.ReadAsStringAsync().Result;
            var htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(html);
            var firstItem = htmlDocument.DocumentNode.SelectSingleNode(".//div[@class='entry entry_v2 boxy']");
            var countVariantov = htmlDocument.DocumentNode.SelectNodes(".//div[@class='entry entry_v2 boxy']");
            chastRechi.Add(firstItem.SelectSingleNode(".//span[@class='fl']").InnerText);
            firstItem = firstItem.SelectSingleNode(".//div[@class='sblocks']");
            var temp = firstItem.SelectNodes(".//div[@class='sblock sblock_entry']//span[@class='def_text']");
            for (int i = 0; i < temp.Count; i++)
            {
                del.Add(temp[i].InnerText);
            }
            result.Add(chastRechi[0], del);
            for (int i = 2; i <= countVariantov.Count; i++)
            {
                List<String> tempPerevod = new List<String>();
                var items = htmlDocument.DocumentNode.SelectSingleNode($".//div[@id='ld_entry_v2_jumplink_{word}_{i}']");
                chastRechi.Add(items.SelectSingleNode(".//span[@class='fl']").InnerText);
                items = items.SelectSingleNode(".//div[@class='sblocks']");
                temp = items.SelectNodes(".//div[@class='sblock sblock_entry']//span[@class='def_text']");
                if (temp != null)
                {
                    for (int j = 0; j < temp.Count; j++)
                    {
                        tempPerevod.Add(temp[j].InnerText);
                    }
                    result.Add(chastRechi[i - 1], tempPerevod);
                }
            }
            return Json(result);
        }
    }
}
