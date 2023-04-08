const { SlashCommandBuilder } = require('discord.js');

const dataRay = [];

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXV0b21hdGVkIiwia2lkIjoiNWpuQlByZ0VCSCIsIm9pZCI6ImdVRW4wRTJYS08iLCJ1aWQiOiJEbXNLQ0dMdWNrIiwiaWF0IjoxNjc5OTUxNzk3LCJleHAiOjE3MTE0MDEzOTd9.wjiTaQjvPzX18U02Wp2nF8vmOqNuFl7HiZXpMrFGG38';

const apiUrl = 'https://sobol.io/d/api/v1/org/gUEn0E2XKO/teams';

fetch(apiUrl, {
  headers: {
    'Authorization': `Bearer ${apiKey}`
  }
})
  .then(response => response.json())
  .then(data => {

    data.forEach(team => {
      dataRay.push(team);
    });
    // console.log(data)
    
  })
  .catch(error => {
    console.log(error);
  });

module.exports.data = new SlashCommandBuilder()
  .setName('message-team')
  .setDescription('messages sobol team members')
  .addStringOption(option =>
    option.setName('teams')
      .setDescription('Select from teams')
      .setRequired(true)
      .addChoices(...dataRay)
      .setAutocomplete(true)
  );

module.exports.execute = async (interaction) => {
  const team = interaction.options.getString('teams');
 // console.log(dataRay);
  const selectedTeam = dataRay.find(t => t.name === team);
  console.log(selectedTeam);
if (selectedTeam) {
    const members = selectedTeam.value.map(member => `<@${member}>`).join(', ');
    interaction.reply(`Pinging team ${team} members: ${members}`);
  } else {
    interaction.reply(`Sorry, the selected team '${team}' was not found.`);
  }
};



// discourse key : f4aaf3792e558ff53d772ad0d1bf02a880b2c32136a51043d17f76fe8a4e6bb3


