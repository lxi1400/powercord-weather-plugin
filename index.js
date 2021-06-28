const { Plugin } = require("powercord/entities");
const { get } = require('powercord/http');

const Settings = require('./components/Settings');


module.exports = class Weather extends Plugin {

  async startPlugin() {

    powercord.api.settings.registerSettings('weather', {
      category: this.entityID,
      label: 'Weather',
      render: Settings
    })

    powercord.api.commands.registerCommand({

      command: "weather",
      aliases: [],
      description: "Allows you to get the current weather in a area ",
      usage: "{c} weather Colorado",
      
      executor: async (args) => {
        try {
          if (!args[0])
          return {
            send: false,
            result: {
              type: "rich",
              title: "Weather | Error",
              description:
                "Please provide a place for me to look up.",
            },
          };

          const {body} = await get(`http://api.weatherapi.com/v1/current.json?key=${this.settings.get("Api-Key", "")}&q=${args.join('-')}&aqi=no`)
          return {
            send: false,
            result: {
              type: 'rich',
              title: `Weather info for ${body.location['name']}, ${body.location['region']}`,
              color: '#000080',
              fields: [{
                  name: 'City',
                  value: `${body.location['name'] || 'Unknown'}`,
                  inline: true
              }, {
                  name: 'Country',
                  value:  `${body.location['country'] || 'Unknown'}`,
                  inline: true
              }, {
                  name: 'Region',
                  value: `${body.location['region'] || 'Unknown'}`,
                  inline: true
              }, {
                  name: 'Temperature [Fahrenheit]',
                  value: `${body.current['temp_f'] || 'Unknown'}`,
                  inline: true
              }, {
                name: 'Temperature [Celsius]',
                value: `${body.current['temp_c'] || 'Unknown'}`,
                inline: true
              }, {
                name: 'Condition',
                value: `${body.current['condition']['text'] || 'Unknown'}`,
                inline: true
              }, {
                name: 'Humidity',
                value: `${body.current['humidity'] || 'Unknown'}`,
                inline: true
              }, {
                name: 'Wind [MPH]',
                value: `${body.current['wind_mph'] || 'Unknown'}`,
                inline: true
              }, {
                name: 'Wind [KPH]',
                value: `${body.current['wind_kph'] || 'Unknown'}`,
                inline: true
              }, {
                name: 'Wind Direction',
                value: `${body.current['wind_dir'] || 'Unknown'}`,
                inline: true
              }]
          }, 
          }
        } catch (e){
          return {
            send: false,
            result: `There was an error looking up ${args.join('-')}, did you enter a api-key in settings? ${e}`,
          };
        }
      },
    });
  }
  pluginWillUnload() {
    powercord.api.settings.unregisterSettings('weather_settings')
    powercord.api.commands.unregisterCommand("weather");
  }


  

};
