const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
let dataRay={};
let choices={};
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXV0b21hdGVkIiwia2lkIjoiY3VPQndkOTZRNCIsIm9pZCI6Il84eGhXdTMxMVIiLCJ1aWQiOiJSdWl3S2ZKOHV6IiwiaWF0IjoxNjgwOTIxNDA0LCJleHAiOjE5OTYyODE0MDR9.MRWwDD34Wgt2g-qdhAtzPq8KSJ7mbHB90ajbCGapFuw';

const apiUrl = 'https://sobol.io/d/api/v1/org/_8xhWu311R/workspaces/foo/data?_workspaceType=structure&includeArchived=false&maxLevel=2&objects=TppT8ouUUU,team';

const headers = {
  'Authorization': `Bearer ${apiKey}`
};

// Make a GET request to the API using Axios
  async function getChoices () {
    await axios.get(apiUrl, {
    headers: headers
  })
  .then(response => {
    let teamData = response.data; 
    dataRay = Object.values(teamData.teamsById)
    choices = dataRay.map
      (team => ({name:team.name, value: team.value}));
    return choices;
   
  })
  .catch(error => {
    console.error(error);
  });
                               }

//console.log(getChoices());

    module.exports.data = new SlashCommandBuilder()
  .setName('message-team')
  .setDescription('messages sobol team members')
  .addStringOption(option =>
    option.setName('teams')
      .setDescription('Select from teams')
      .setRequired(true)
      .addChoices()
      .setAutocomplete(true)
  );
                         

module.exports.execute = async (interaction) => {
  const team = interaction.options.getString('teams');
  const selectedTeam = dataRay.find(t => t.name === team);
  console.log(dataRay);
  console.log(choices);
  //  console.log(selectedTeam);
  if (selectedTeam) {
    const members = selectedTeam.value.map(member => `<@${member}>`).join(', ');
    interaction.reply(`Pinging team ${team} members: ${members}`);
  } else {
    interaction.reply(`Sorry, the selected team '${team}' was not found.`);
  }
  
};


