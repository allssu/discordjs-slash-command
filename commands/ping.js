const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("파푸니카")
    .setDescription("호라고 대답합니다!"),
  async execute(interaction) {
    await interaction.reply("호!");
  },
};
