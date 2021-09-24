const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name :'незнакомец'}`))
bot.help((ctx) => ctx.reply(text.commands))

bot.command('skils', async (ctx) => {
   try{ await ctx.replyWithHTML('<b>Hard skils</b>', Markup.inlineKeyboard(
  [  [Markup.button.callback('Адаптивная верстка', 'btn_1'), Markup.button.callback('JS,ES6', 'btn_2')],
    [Markup.button.callback('React', 'btn_3'), Markup.button.callback('Webpack', 'btn_4')]
  ]
  ))
} catch (e) {
    console.error(e)
}
})

function ActionBot ( name, src , text) {
    bot.action (name, async (ctx) => {
        try {
         await ctx.answerCbQuery()
         if (src !== false) {
             await ctx.replyWithPhoto({
                 source: src
             })
         }

         await ctx.replyWithHTML(text, {
            disable_web_page_preview: true
        })
        } catch(e) {
            console.error(e)
        }
    })
}

ActionBot('btn_1', './img/1.jpg', text.text1)
ActionBot('btn_1', './img/2.jpg', text.text2)
ActionBot('btn_1', false, text.text3)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))