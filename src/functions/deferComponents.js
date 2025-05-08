module.exports = (customId, components, values) => {
   // imports
   const { emojis } = require("../../");
   const { ComponentType, parseEmoji } = require("discord.js");


   // find the component with the customId in the components
   const deferComponents = JSON.parse(JSON.stringify(components));
   let foundComponent;

   const loopComponents = (components, disableComponents = false) => {
      mainLoop: for (const component of components) {

         if (component.type === ComponentType.ActionRow) { // this is an action row component
            for (const actionRowComponent of component.components) {
               if (disableComponents) { // disable the components
                  actionRowComponent.disabled = true;
               } else { // set the foundComponent if the customId matches
                  if (actionRowComponent.custom_id === customId) {
                     foundComponent = actionRowComponent;
                     break mainLoop;
                  };
               };
            };

         } else if (component.type === ComponentType.Section) { // this is a section component
            if (disableComponents) { // disable the components
               if (component.accessory.type === ComponentType.Button) {
                  component.accessory.disabled = true;
               };
            } else { // set the foundComponent if the customId matches
               if (component.accessory.custom_id === customId) {
                  foundComponent = component.accessory;
                  break mainLoop;
               };
            };

         } else if (component.type === ComponentType.Container) { // this is a container component
            loopComponents(component.components, disableComponents); // recursive search through the container component's own components
         };

      };
   };

   loopComponents(deferComponents);


   // no foundComponent
   if (!foundComponent)
      throw new TypeError(`🚫 @magicalbunny31/pawesome-utility-stuffs - deferComponents(): component not found`);


   if (foundComponent.type === ComponentType.Button) { // this is a button
      foundComponent.emoji = parseEmoji(emojis().loading);


   } else if (foundComponent.type === ComponentType.StringSelect) { // this is a string select menu
      const options = foundComponent.options;

      for (const option of options)
         option.default = false;

      for (const option of options)
         if (values.includes(option.value))
            Object.assign(option, {
               emoji: parseEmoji(emojis().loading),
               default: true
            });


   } else if ([ ComponentType.UserSelect, ComponentType.MentionableSelect, ComponentType.RoleSelect, ComponentType.ChannelSelect ].includes(foundComponent.type)) { // this is a user select menu, mentionable select menu, role select menu, or channel select menu
      foundComponent.default_values = values;


   } else // uhm uh uhh can't defer this component
      throw new TypeError(`🚫 @magicalbunny31/pawesome-utility-stuffs - deferComponents(): can't defer this component, try deferring the interaction instead`);


   // disable all components
   loopComponents(deferComponents, true);


   // return the deferred components
   return deferComponents;
};