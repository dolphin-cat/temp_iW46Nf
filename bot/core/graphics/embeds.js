const { MessageEmbed } = require('discord.js');
const colors = require('./colors');
const { prefix } = require('../../config/commands-config.json');

module.exports = {
   info(color, description) {
      return new MessageEmbed()
         .setColor(color || colors.primary)
         .setTitle('Info')
         .setDescription(description)
         .setFooter(`Use ${prefix}help for support`);
   },

   warn(description) {
      return new MessageEmbed()
         .setColor(colors.warn)
         .setTitle('Warning')
         .setDescription(description)
         .setFooter(`Use ${prefix}help for support`);
   },

   error(description) {
      return new MessageEmbed()
         .setColor(colors.error)
         .setTitle('Error')
         .setDescription(description)
         .setFooter(`Use ${prefix}help for support`);
   },

};
