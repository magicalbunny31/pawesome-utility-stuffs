module.exports = (customId, components, values) => {
   // imports
   const { emojis } = require("../../");
   const { ActionRowBuilder, BaseSelectMenuBuilder, ButtonBuilder, ContainerBuilder, SectionBuilder, StringSelectMenuBuilder, parseEmoji } = require("discord.js");


   // find the component with the customId in the components
   let foundComponent;

   const loopComponents = (components, disableComponents = false) => {
      mainLoop: for (const component of components) {

         if (component instanceof ActionRowBuilder) { // this is an action row component
            for (const actionRowComponent of component.components) {
               if (disableComponents) { // disable the components
                  actionRowComponent.data.disabled = true;
               } else { // set the foundComponent if the customId matches
                  if (actionRowComponent.data.custom_id === customId) {
                     foundComponent = actionRowComponent;
                     // foundComponent.data.options = actionRowComponent.data.options;
                     break mainLoop;
                  };
               };
            };

         } else if (component instanceof SectionBuilder) { // this is a section component
            if (disableComponents) { // disable the components
               if (component.accessory instanceof ButtonBuilder) {
                  component.accessory.data.disabled = true;
               };
            } else { // set the foundComponent if the customId matches
               if (component.accessory.data.custom_id === customId) {
                  foundComponent = component.accessory;
                  break mainLoop;
               };
            };

         } else if (component instanceof ContainerBuilder) { // this is a container component
            loopComponents(component.components, disableComponents); // recursive search through the container component's own components
         };

      };
   };

   loopComponents(components);


   // no foundComponent
   if (!foundComponent)
      throw new TypeError(`🚫 @magicalbunny31/pawesome-utility-stuffs - deferComponents(): component not found`);


   if (foundComponent instanceof ButtonBuilder) { // this is a button
      foundComponent.data.emoji = parseEmoji(emojis().loading);


   } else if (foundComponent instanceof StringSelectMenuBuilder) { // this is a string select menu
      const options = foundComponent.options;

      for (const option of options)
         option.default = false;

      for (const option of options)
         if (values.includes(option.data.value))
            Object.assign(option.data, {
               emoji: parseEmoji(emojis().loading),
               default: true
            });


   } else if (foundComponent instanceof BaseSelectMenuBuilder) { // this is a user select menu, mentionable select menu, role select menu, or channel select menu
      foundComponent.data.default_values = values;


   } else // uhm uh uhh can't defer this component
      throw new TypeError(`🚫 @magicalbunny31/pawesome-utility-stuffs - deferComponents(): can't defer this component, try deferring the interaction instead`);


   // disable all components
   loopComponents(components, true);


   // return the deferred components
   return components;
};