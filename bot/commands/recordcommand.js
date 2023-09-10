const fetch = require('node-fetch');
module.exports = {
   name: 'record',
   aliases: [],
   description: 'Record my screen',

   // Whether the command requires arguments
   reqArgs: false,
   // Arguments usage
   usage: '',
   // Example usage of the command
   exampleUsage: 'record',

   category: '',

   // eslint-disable-next-line no-unused-vars
   async run(ctx) {
    function makeid(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
    }
    let recid = makeid(32);
    let msg = await ctx.send("http://localhost:6969/?id="+recid);
    
    (async () => {
      const resp = await fetch("http://recordsite.local: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"+recid);
      const restext = (await resp.text()).slice(1, -1);
      msg.delete();
      ctx.send({content: "Recording:", files: [restext]});
    })();
   },
};
