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
      const resp = await fetch("http://127.0.0.1:6969/startrec/<authkey>/"+recid);
      const restext = (await resp.text()).slice(1, -1);
      msg.delete();
      ctx.send({content: "Recording:", files: [restext]});
    })();
   },
};
