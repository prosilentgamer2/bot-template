module.exports = {
	name: 'help',
	usage: `(command name)`,
	guildOnly: false,
	enabled: true,
	level: 0,
	aliases: [],
	category: 'Misc',
	description: 'Display command info.'
}

const Discord = require("discord.js")
module.exports.run = async (client, message, args, level) => {
	if (!args[0]) {
		const embed = new Discord.MessageEmbed()
			.setTitle(`${client.user.username} help.`)
			.setDescription(`My prefix here is \`${message.settings.prefix}\`. For more help on a command run \`${message.settings.prefix}help [command]\``)
			.setColor('RANDOM')
		const cmds = message.guild ? client.commands.filter(cmd => cmd.level <= level) : client.commands.filter(cmd => client.level <= level && cmd.conf.guildOnly !== true);
		let values = {}
		cmds.forEach(cmd => {
			if (!values[cmd.category]) values[cmd.category] = []
			values[cmd.category].push(cmd)
		})
		embed.addFields(Object.keys(values).map(v => {
			c = values[v]
			return {
				name: v,
				value: values[v].map(c => `**${message.settings.prefix}${c.name} ${c.usage}**
${c.description}`).join('\n')
			}
		}))
		message.channel.send(embed)
	} else {
		let cmd = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]))
		if (!cmd) return message.reply(`No command found called \`${args[0]}\`. To see all the commands run \`${message.settings.prefix}help\``)
		const embed = new Discord.MessageEmbed()
			.setTitle(cmd.name)
			.setDescription(`${message.settings.prefix}${cmd.name} ${cmd.usage}
${cmd.description}`)
			.addField('Category:', cmd.category, true)
			.addField('Aliases:', cmd.aliases[0] ? `\`${cmd.aliases.join('` `')}\`` : 'none', true)
			.addField('Guild Only:', cmd.guildOnly, true)
			.setColor('RANDOM')
			message.channel.send(embed)
	}
}