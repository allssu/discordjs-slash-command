const { SlashCommandBuilder, ActionRow } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, Message } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("베른북부")
    .setDescription("베른 북부 떠돌이 상인"),
  async execute(interaction) {
    const buttons = [
      {
        customId: "test1",
        label: "크로나 항구(전호)",
        style: "DANGER",
        async action(interaction) {
          await interaction.reply("베른 북부 / 크로나 항구 / 전호");
        },
      },
      {
        customId: "test2",
        label: "파르나 숲(전호)",
        style: "DANGER",
        async action(interaction) {
          await interaction.reply("베른 북부 / 파르나 숲 / 전호");
        },
      },
      {
        customId: "test3",
        label: "페스나르 고원(전호)",
        style: "DANGER",
        async action(interaction) {
          await interaction.reply("베른 북부 / 페스나르 고원 / 전호");
        },
      },
      {
        customId: "test4",
        label: "베르닐 삼림(전호)",
        style: "DANGER",
        async action(interaction) {
          await interaction.reply("베른 북부 / 베르닐 삼림 / 전호");
        },
      },
      {
        customId: "test5",
        label: "발란카르 산맥(전호)",
        style: "DANGER",
        async action(interaction) {
          await interaction.reply("베른 북부 / 발란카르 산맥 / 전호");
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
    await interaction.reply({
      content: "떠돌이 상인 제보",
      ephemeral: true,
      components: [row],
    });

    const filter = (interaction) => {
      return buttons.filter(
        (button) => button.customId === interaction.customId
      );
    };

    // 버튼 응답하는 코드
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 180 * 1000,
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
      console.log("시간 초과");
    });
  },
};
