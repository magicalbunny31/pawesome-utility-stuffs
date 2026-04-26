import { ApplicationEmoji, ChatInputCommandInteraction, GuildMember, GuildTextBasedChannel, Interaction, InteractionReplyOptions, MessageComponent, MessageComponentInteraction, MessageContextMenuCommandInteraction, MessagePayload, ModalSubmitInteraction, PermissionFlagsBits, Snowflake, User, UserContextMenuCommandInteraction } from "discord.js";


type BaseCommandInteraction = ChatInputCommandInteraction | MessageComponentInteraction | ModalSubmitInteraction | MessageContextMenuCommandInteraction | UserContextMenuCommandInteraction;

export class BaseCommand {
   constructor(interaction: BaseCommandInteraction);

   /**
    * 💬 this interaction
    */
   public interaction: BaseCommandInteraction;

   /**
    * 🔢 get an id of this app's commands
    *
    * 🌐 application commands are queried before guild commands
    * @param commandName 🏷️ name of the command to get the id of
    */
   public async getCommandId(commandName: string = this.interaction.commandName): Promise<Snowflake>;

   /**
    * ❓ whether this interaction has been replied to already
    */
   public repliedTo: boolean;

   /**
    * 👥 for `MessageComponentInteraction`s: whether the user who created this interaction is the same as the user who created the interaction message this component came from
    */
   public isSameCommandUser(): boolean;

   /**
    * 🔕 whether this interaction should be responded to as ephemeral
    */
   public get hidden(): boolean;

   /**
    * ⏳ defer the interaction, or update the message to show a "deferred" state using `@magicalbunny31/pawesome-utility-stuffs/discord`'s `deferComponents`
    *
    * 🔕 this takes into account `BaseCommand#hidden` or will always be hidden if not `BaseCommand#isSameCommandUser()`
    * @param customId 🆔 override the custom_id (which is automatically obtained from the interaction) of the component to defer, if this interaction came from a message
    */
   public async deferInteraction(customId?: string): Promise<void>;

   /**
    * 💬 respond to the interaction, update the message's reply if this is a message component, or create a new reply if not `BaseCommand#isSameCommandUser()`
    *
    * 🔕 this takes into account `BaseCommand#hidden` or will always be hidden if not `BaseCommand#isSameCommandUser()`
    * @param payload 📋 payload for this message
    */
   public async respondToInteraction(payload: string | MessagePayload | InteractionReplyOptions): Promise<void>;
};


/**
 * 🔓 check if a member has permissions to use a (discord) chat-input application command
 * @param commandId 🔎 id of the command to view permissions of
 * @param channel 💬 channel to check permissions against
 * @param member 👤 member to check permissions against
 * @see https://cdn.nuzzles.dev/socials/discord/application-command-permissions-flowchart.png
 * @example
 * checkChatInputCommandPermissions(`490178047325110282`, channel, user);
 * // => true
 */
export async function checkChatInputCommandPermissions(commandId: string, channel: GuildTextBasedChannel, member: GuildMember): Promise<boolean>;


type EmojisMap = ReturnType<typeof emojis>;

/**
 * 💭 set a [Button](https://discord.com/developers/docs/components/reference#button) component to a "deferred" state in a list of message `components`
 * @param customId 🆔 custom_id of the [Button](https://discord.com/developers/docs/components/reference#button) component to set to a "deferred" state
 * @param components 📋 all `component`s of the message
 */
export function deferComponents(customId: string, emojis: EmojisMap, components: MessageComponent[]): MessageComponent[];

/**
 * 💭 set a [String Select](https://discord.com/developers/docs/components/reference#string-select), [User Select](https://discord.com/developers/docs/components/reference#user-select), [Role Select](https://discord.com/developers/docs/components/reference#role-select), [Mentionable Select](https://discord.com/developers/docs/components/reference#mentionable-select), or [Channel Select](https://discord.com/developers/docs/components/reference#channel-select) component to a "deferred" state in a list of message `components`
 * @param customId 🆔 custom_id of the [String Select](https://discord.com/developers/docs/components/reference#string-select), [User Select](https://discord.com/developers/docs/components/reference#user-select), [Role Select](https://discord.com/developers/docs/components/reference#role-select), [Mentionable Select](https://discord.com/developers/docs/components/reference#mentionable-select), or [Channel Select](https://discord.com/developers/docs/components/reference#channel-select) component to display as deferred
 * @param components 📋 all `component`s of the message
 * @param values 👉 values of the [String Select](https://discord.com/developers/docs/components/reference#string-select), [User Select](https://discord.com/developers/docs/components/reference#user-select), [Role Select](https://discord.com/developers/docs/components/reference#role-select), [Mentionable Select](https://discord.com/developers/docs/components/reference#mentionable-select), or [Channel Select](https://discord.com/developers/docs/components/reference#channel-select) component that were selected
 */
export function deferComponents(customId: string, emojis: EmojisMap, components: MessageComponent[], values: string[]): MessageComponent[];


/**
 * 🦊 discord-formatted emoji strings
 * @param applicationEmojis 🤖 array of this app's `ApplicationEmoji`s - don't specify this argument to only return emojis from guilds
 * @returns ❓ this returns an [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) combining this app's `ApplicationEmoji`s (optional) and emojis from guilds
 */
export function emojis(applicationEmojis?: ApplicationEmoji[]): { [emojiName: string]: string };


/**
 * 📝 formats a permission to a readable string
 * @see https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
 * @param permissionsInput 🗨️ permissions to format
 * @example
 * formatPermission([ PermissionFlagsBits.BanMembers, PermissionFlagsBits.KickMembers ]);
 * formatPermission(0x6);
 * formatPermission(0x6n);
 * // => [ `Ban Members`, `Kick Members` ]
 */
export function formatPermissions(permissionsInput: bigint): string[];


/**
 * ⚠️ responds to the interaction by showing the user an error message
 * @param interaction 💬 the command's interaction
 * @param guildInvite 🔗 this application's guild invite
 * @param error 📋 the error that occurred
 */
export async function respondToErrorInteraction(interaction: Interaction, guildInvite?: string = `https://nuzzles.dev/discord`, error?: Error): Promise<void>;


/**
 * 🗯️ respond to a `MessageComponentInteraction` explaining that they are not the target user to respond to this ``MessageComponent
 * @param interaction 💬 the `MessageComponentInteraction` to respond to
 * @param expectedUser 👤 the user that should be able to interact with this `MessageComponent`
 * @param receivedUser 👥 the user that ended up interacting with this `MessageComponent`
 */
export async function respondToWrongUserMessageComponentInteraction(interaction: MessageComponentInteraction, expectedUser: User, receivedUser: User): Promise<void>;