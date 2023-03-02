import './commands'
import './friends'

module.exports = (on, config) => {
    on('before:browser:launch', (browser = {}, launchOptions) => {
        console.log(launchOptions.args)

        if (browser.name == 'chrome') {
            launchOptions.args.push('--disable-gpu')
        }

        return launchOptions
    })
}