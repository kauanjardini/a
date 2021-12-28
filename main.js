_kauan = process.cwd()
__path = process.cwd()

var express = require('express');
var router = express.Router();
var { exec } = require('child_process')
var fetch = require('node-fetch')
var canvacord = require('canvacord').Canvas
var canvacord2 = require('canvacord')
const Canvas = require("discord-canvas")
var fs = require('fs')

async function getBuffer(url) {
  he = await fetch(url).then(c => c.buffer())
   return he
}
async function getJson(url) {
  he = await fetch(url).then(c => c.json())
   return he
}
function getRandom(nans) {
  he = nans[Math.floor(Math.random() * nans.length)]
   return he
}
 router.get('/docs', async (req, res) => {
   
 res.sendFile(__path+ '/public/home.html')
 })
 router.all('/loli', async (req, res) => {
   try {
   json = JSON.parse(fs.readFileSync('lib/lolis.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send({ status: 400, response: 'Erro no servidor' })
   }
   })
  router.get('/canvas/*', async (req, res) => {
   let { url, texto } = req.query
   try {
  switch(req.path.replace(/\/canvas/, '').toLowerCase()) {
 case '/trigger':
 case '/trigger/':
  if (!url) return res.status(408).send({ status: 408, menssagem: 'Coloque a url no parametrô'})
  res.type('gif')
  res.send(await canvacord.trigger(url))
 break
    case '/rank':
      rank = new canvacord2.Rank()
    .setAvatar('https://telegra.ph/file/64711564fe456c969d13e.jpg')    
    .setUsername('kauan')   
rank.build()
    .then(buffer => {
        canvacord2.write(buffer, "rankCard.png");
       
        res.sendFile('rankCard.png')
    });
      
      break 
 case '/welcome':
 case '/welcome/':
 // if (!url) return res.status(408).send({ status: 408, menssagem: 'Coloque a url no parametrô'})
nome = req.query.nome
nomegp = req.query.nomegp
membros = req.query.membros
perfil = req.query.perfil
fotogp = req.query.fotogp
fundo = req.query.fundo
      
  res.type('jpg')
  res.send(await getBuffer(`https://akame-api.herokuapp.com/api/card/welcome?nome=${nome}&nomegp=${nomegp}&membros=${membros}&perfil=${perfil}&fotogp=${fotogp}&fundo=${fundo}&apikey=Bd5d6oRj`))
 break
       case '/goodbye':
 case '/goodbye/':
 // if (!url) return res.status(408).send({ status: 408, menssagem: 'Coloque a url no parametrô'})
nome = req.query.nome
nomegp = req.query.nomegp
membros = req.query.membros
perfil = req.query.perfil
fotogp = req.query.fotogp
fundo = req.query.fundo
      
  res.type('jpg')
  res.send(await getBuffer(`https://akame-api.herokuapp.com/api/card/goodbye?nome=${nome}&nomegp=${nomegp}&membros=${membros}&perfil=${perfil}&fotogp=${fotogp}&fundo=${fundo}&apikey=Bd5d6oRj`))
 break
  
 case '/changemymind':
 case '/changemymind/':
  if (!texto) return res.status(408).send({ status: 408, menssagem: 'Coloque o texto no parametrô' })
  res.type('jpg')
  res.send(await canvacord.changemymind(texto))
  break
 case '/clyde':
 case '/clyde/':
  if (!texto) return res.status(408).send({ status: 408, menssagem: 'Coloque o texto no parametrô' })
  res.type('jpg')
  res.send(await canvacord.clyde(texto))
  break
 default: 
 res.status(404).json({
            status:404,
            error: 'A página que você está procurando não foi encontrada',
            endpoint: req.path
        })
 }
  } catch (e) {
  console.error(e) 
   res.type('text/json')
   res.status(400).send({ status: 400, menssagem: 'ops, erro no servidor por favor reporte para meu dono!' })
 }
 })
 router.get('/nsfw/hentai', async (req, res) => {
 try {
 end = getRandom(["waifu", "neko"])
 let { url } = await getJson(`https://api.waifu.pics/nsfw/${end}`)
 let buffer = await getBuffer(url)
 res.type('png')
 res.send(buffer)
 } catch {
 res.type('text/json')
 res.status(400).send({ status: 400, menssagem: 'ops, Erro no servidor por favor reporte para meu dono!' })
 }
 })
 router.all('/shota', async (req, res) => {
   try {
   json = JSON.parse(fs.readFileSync('lib/shotas.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send({ status: 400, response: 'Server Error!' })
   }
   })
router.post('/post/body', async (req, res) => {
  res.send(req.body)
})
   router.all('/api/nsfwloli', async (req, res) => {
   try {
   json = JSON.parse(fs.readFileSync('lib/nsfwlolis.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send({ status: 400, response: 'ops, Erro no servidor por favor reporte para meu dono!' })
   }
   })
   router.all('*', async (req, res) => {
   res.status(404).sendFile(_kauan+ '/route/404.html')
})
  

module.exports = router
