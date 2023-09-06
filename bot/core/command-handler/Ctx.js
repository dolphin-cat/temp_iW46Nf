const colors = require('../graphics/colors');

module.exports = class Ctx {
   constructor(message, commandName, args) {
      this.message = message;
      this.channel = message.channel;
      this.guild = message.guild;

      this.user = message.author;
      this.member = message.member;

      this.commandName = commandName;
      this.args = args;
   }

   async react(reaction) {
      await this.message.react(reaction);
   }

   async send(data) {
      return this.channel.send(data);
   }

   // Gets the bot color in the server where the message has been sent
   // or the primary color set in the colors.js file
   get hexColor() {
      return this.guild ? this.guild.me.displayHexColor : colors.primary;
   }

   // Other useful getters
   get guildID() {
      return this.guild ? this.guild.id : null;
   }

   get userID() {
      return this.user.id;
   }

   get channelID() {
      return this.channel.id;
   }
};
