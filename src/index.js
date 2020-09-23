const Discord = require('discord.js')
const dotenv = require('dotenv')
const detectHandler = require('./parser/detectHandler')
const {
  RequestHandlerError,
} = require('./error-utils')
const { log } = require('./utils')

// Load this as early as possible, to init all the environment variables that may be needed
dotenv.config()
// Sentry.init({ dsn: environment('SENTRY_DSN') })

const client = new Discord.Client()

client.on('ready', () => {
  log(`Bot successfully started as ${client.user.tag} 🐝`)
})

client.on('message', async message => {
  if(message.author.bot) return

  try {
    if (message.content.includes('app.brightid.org/connection-code')) {
      // Deletes the message inmediately.
      message.delete({ timeout: 500 })

      // Sends a PM to the user, letting them know it is agains't the rules.
      message.author.send({
        'embeds': [
          {
            'title': 'Warning 🚨',
            'description': 'You should not send BrightID connection links on public channels!',
            'color': 16769024,
            'fields': [
              {
                'name': 'Want to get verified?',
                'value': 'The best way is to join a verification party at https://www.brightid.org/meet.'
              }
            ]
          }
        ],
      })
        
      log(`Deleted message with BrightID connection link from ${message.author}.`)
    } else {
      const handler = detectHandler(message.content)
      handler(message)
      log(
        `Served command ${message.content} successfully for ${message.author.username}.`,
      )
    }
  } catch (err) {
    if (err instanceof RequestHandlerError) {
      message.reply(
        'Could not find the requested command. Please use !ac help for more info.',
      )
    } else {
      log(`An error just happened: ${err}`)
    }
    // Sentry.captureException(err)
  }
})

client.login(process.env.DISCORD_API_TOKEN)