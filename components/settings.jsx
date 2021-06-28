const { React } = require('powercord/webpack');
const { TextInput } = require('powercord/components/settings');

module.exports = ({ getSetting, updateSetting }) => (
  <div>
    <TextInput
      note='Your api key from weatherapi.com.'
      defaultValue={getSetting('Api-Key', '')}
      required={true}
      onChange={val => updateSetting('Api-Key', val.endsWith(' ') ? val.slice(0, -1) : val)}
    >
      "Insert your api key here"
    </TextInput>

  </div>
);
