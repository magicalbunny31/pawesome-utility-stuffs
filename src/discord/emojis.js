import { formatEmoji } from "discord.js";


const globalEmojis = {
   // discord
   "app":          "<a:app:1295486985644937328>",
   "verified_app": "<a:verified_app:1295486984344571954>",

   "shapes":               "<a:shapes:1230940373191364688>",
   "slash_command":        "<a:slash_command:1193174898546319471>",
   "context_menu_command": "<a:context_menu_command:1193174900052066444>",

   "online":  "<a:online:1168303948462047344>",
   "idle":    "<a:idle:1168303967537741887>",
   "dnd":     "<a:dnd:1168303998017744986>",
   "offline": "<a:offline:1175493190711791626>",


   // mutant standard
   "mutant_standard": "<:mutant_standard:911322978313179187>",

   "yes":  "<:yes:792173102146519051>",
   "no":   "<:no:792173102377205811>",

   "furry_pride":    "<:furry_pride:797613808147365898>",
   "rainbow_flag":   "<:rainbow_flag:1108130986723651664>",
   "pansexual_flag": "<a:pansexual_flag:1261850864490905672>",
   "nonbinary_flag": "<a:nonbinary_flag:1261850865627697224>",

   "rabbit":            "<:rabbit:874677500679192606>",
   "fox":               "<:fox:792165588180795414>",
   "wolf":              "<:wolf:945731994233471016>",
   "deer_with_antlers": "<:deer_with_antlers:945732149359812648>",


   // logos
   "e621":     "<a:e621:1017479439380123748>",


   // bunny furfest 🐰🐾
   "FOX":      "<a:FOX:807092996327473162>",
   "airplane": "<a:airplane:896512429058555914>",
   "balto":    "<:balto:553617449883533332>",
   "nuuu":     "<:nuuu:619319708335996938>",

   "foxbox":   "<a:foxbox:701941015598202941>",
   "foxsleep": "<a:foxsleep:701941646719451146>",
   "foxsnug":  "<a:foxsnug:701942934139830285>",

   "furdancing": "<a:furdancing:699524108203065416>",
   "awoo":       "<:awoo:704359905502560257>",
   "pawbs":      "<:pawbs:701945578501963876>",

   "thinking": "<a:thinking:817599069098606602>",
   "claps":    "<a:claps:1010002734377873512>",
   "eugh":     "<:eugh:1464405997425529059>",
   "hehe":     "<:hehe:1464405940852752618>",
   "ping":     "<:ping:1464405994854547670>",
   "bruh":     "<:bruh:1487179295750226082>",
   "stare":    "<:stare:1464405938101420177>",
   "WHAT":     "<:WHAT:1464405943918788719>",
   "GROWL":    "<:GROWL:1464405988584194153>",
   "HOLY":     "<:HOLY:1464405950139203759>",
   "mwaah":    "<:mwaah:1464405947706249337>",
   "bonk":     "<:bonk:1487179298652684457>",
   "vibe":     "<a:vibe:1487182326499774564>",
   "pop":      "<a:pop:1487182323693654286>",
   "pleaseee": "<a:pleaseee:1487179120889696398>",
   "noted":    "<:noted:1464405992161804359>",
   "dazed":    "<:dazed:1487179293523050608>",

   "aie":                              "<:aie:1112599295951126579>",
   "bah":                              "<:bah:1112599298476085299>",
   "bap":                              "<:bap:1112599329975320576>",
   "beg":                              "<a:beg:1112599351232049212>",
   "boooo":                            "<:boooo:1112599319200153682>",
   "boop":                             "<a:boop:1112599358970544280>",
   "concern":                          "<a:concern:1112599341761302569>",
   "EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE": "<:EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE:1112599286895624312>",
   "eepy":                             "<a:eepy:1112599617062846504>",
   "haha_uhh":                         "<a:haha_uhh:1112599343715864637>",
   "happ":                             "<:happ:906683365791502366>",
   "heart":                            "<a:heart:1112599356231663648>",
   "hug":                              "<:hug:1112599305283452978>",
   "hug_2":                            "<a:hug_2:1112599353924788284>",
   "hug_3":                            "<a:hug_3:1112599346345672714>",
   "kiss":                             "<a:kiss:1112599362892218438>",
   "lick":                             "<a:lick:1112599368730693642>",
   "mhn":                              "<:mhn:1112599283829587978>",
   "noooo":                            "<:noooo:1112599289693208696>",
   "oi":                               "<:oi:1112599316360613898>",
   "hmmph":                            "<a:hmmph:1112599365714984971>",
   "ow":                               "<:ow:1112599326259167413>",
   "rip":                              "<:rip:1112599292851523644>",
   "shhh":                             "<:shhh:1112600032085016648>",
   "shy":                              "<a:shy:1112600862196506674>",
   "stop":                             "<:stop:1112599322505252945>",
   "stretch":                          "<a:stretch:1112599348237320292>",
   "sweats":                           "<:sweats:1112599312359239710>",
   "why":                              "<a:why:1112599338938548224>",
   "woah":                             "<:woah:1112599301797986425>",
   "yaya":                             "<:yaya:817600561343889449>",
   "yeet":                             "<:yeet:1112599308265603104>",

   "red_paws":    "<a:red_paws:944005630690197586>",
   "orange_paws": "<a:orange_paws:944006240080650261>",
   "yellow_paws": "<a:yellow_paws:944006322133794856>",
   "green_paws":  "<a:green_paws:944006330467905556>",
   "blue_paws":   "<a:blue_paws:944006339565330472>",
   "purple_paws": "<a:purple_paws:944006349421961248>",
   "pink_paws":   "<a:pink_paws:944006359433752588>"
};


/**
 * @param {import("discord.js").ApplicationEmoji[]}
 * @returns {{ [emojiName: string]: string }}
 */
export default applicationEmojis => {
   // this application's application emojis (or {})
   const appEmojis = applicationEmojis?.reduce((previousEmoji, currentEmoji) =>
      ({
         ...previousEmoji,
         [currentEmoji.name]: formatEmoji(currentEmoji.id, currentEmoji.animated)
            .replace(`emoji`, currentEmoji.name)
      }),
      {}
   )
      || {};


   // return global and application emojis (application emojis will override global emojis if they share the same emoji name)
   return {
      ...globalEmojis,
      ...appEmojis
   };
};