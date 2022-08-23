const { SlashCommandBuilder, ActionRow } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, Message } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("버튼")
    .setDescription("버튼을 만듭니다.!"),
  async execute(interaction) {
    const buttons = [
      {
        customId: "test1",
        label: "첫번째",
        style: "PRIMARY",
        async action(interaction) {
          await interaction.reply("test1 버튼을 클릭했습니다.");
        },
      },
      {
        customId: "test2",
        label: "두번째",
        style: "SECONDARY",
        async action(interaction) {
          await interaction.update({
            content: "버튼을 닫습니다.",
            components: [],
          });
        },
      },
      {
        customId: "KAKAO.GG",
        label: "KAKAO.GG",
        style: "DANGER",
        async action(interaction) {
          await interaction.update({
            content: "카카오지지로 떠납니다.",
            components: [],
          });
        },
      },
    ];
    const row = new MessageActionRow().addComponents(
      buttons.map((button) => {
        return new MessageButton()
          .setCustomId(button.customId)
          .setLabel(button.label)
          .setStyle(button.style);
      })
    );

    // 버튼을 만드는 코드
    await interaction.reply({ content: "버튼!", components: [row] });

    const filter = (interaction) => {
      return buttons.filter(
        (button) => button.customId === interaction.customId
      );
    };

    // 버튼 응답하는 코드
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 60 * 1000,
    });

    collector.on("collect", async (interaction) => {
      //동작 버튼
      const button = buttons.find(
        (button) => button.customId === interaction.customId
      );

      await button.action(interaction);
    });

    // 버튼 작동 시간 초과
    collector.on("end", async (collect) => {
      console.log("버튼 시간 초과");
    });
  },
};
