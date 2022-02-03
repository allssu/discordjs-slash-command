const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("야")
    .setDescription("호라고 대답합니다!"),
  async execute(interaction) {
    await interaction.reply("호!");
  },
};
