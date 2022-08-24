const { SlashCommandBuilder, ActionRow } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, Message } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("아르테미스")
    .setDescription("아르테미스 떠돌이 상인"),
  async execute(interaction) {
    const buttons = [
      {
        customId: "test1",
        label: "로그힐 초소(전호)",
        style: "DANGER",
        async action(interaction) {
          await interaction.reply("아르테미스 / 로그힐 초소 / 전호");
        },
      },
      {
        customId: "test2",
        label: "여행자의 초소(전호)",
        style: "DANGER",
        async action(interaction) {
          await interaction.reply("아르테미스 / 여행자의 초소 / 전호");
        },
      },
      {
        customId: "test3",
        label: "레그리아 수도원(전호)",
        style: "DANGER",
        async action(interaction) {
          await interaction.reply("아르테미스 / 레그리아 수도원 / 전호");
        },
      },
      {
        customId: "test4",
        label: "국경 감시 초소(전호)",
        style: "DANGER",
        async action(interaction) {
          await interaction.reply("아르테미스 / 국경 감시 초소 / 전호");
        },
      },
      {
        customId: "test99",
        label: "취소",
        style: "PRIMARY",
        async action(interaction) {
          await interaction.update({
            content: "버튼을 닫습니다.",
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
