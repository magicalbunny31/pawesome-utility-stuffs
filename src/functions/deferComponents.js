module.exports = (customId, valuesOrComponents, components) => {
   // imports
   const { emojis } = require("../../");
   const { BaseSelectMenuComponent, ButtonComponent, parseEmoji } = require("discord.js");


   // parameters
   const values          = components ? valuesOrComponents : undefined;
   const deferComponents = components || valuesOrComponents;


   // find indexes
   const foundActionRowIndex = deferComponents.findIndex(component => component.components.some(component => component.customId === customId));

   const foundComponent      = deferComponents[foundActionRowIndex].components.find     (component => component.customId === customId);
   const foundComponentIndex = deferComponents[foundActionRowIndex].components.findIndex(component => component.customId === customId);


   // no foundComponent
   if (!foundComponent)
      throw new TypeError(`🚫 @magicalbunny31/pawesome-utility-stuffs - deferComponents(): component not found`);


   if (foundComponent instanceof ButtonComponent) { // this is a button
      deferComponents[foundActionRowIndex].components[foundComponentIndex].data.emoji = parseEmoji(emojis().loading);


   } else if (foundComponent instanceof BaseSelectMenuComponent) { // this is a select menu
      const options = deferComponents[foundActionRowIndex].components[foundComponentIndex].data.options;

      for (const option of options)
         option.default = false;

      for (const option of options)
         if (values.includes(option.value))
            Object.assign(option, {
               emoji: parseEmoji(emojis().loading),
               default: true
            });


   } else // uhm uh uhh can't defer this component
      throw new TypeError(`🚫 @magicalbunny31/pawesome-utility-stuffs - deferComponents(): can't defer this component, try deferring the interaction instead`);


   // disable all components
   for (const actionRow of deferComponents)
      for (const component of actionRow.components)
         component.data.disabled = true;


   // return the deferred components
   return deferComponents;
};