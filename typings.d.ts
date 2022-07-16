declare module "djscord" {
  import { EventEmitter } from "events"
  import { WebSocket } from "ws"
  // import * as DjsVoice from "@discordjs/voice"

  export class Client extends EventEmitter {
    token: string;
    ws: WebSocketInfo
    intents: number;

    ready: boolean;
    readyAt: Date;

    users: ExtendoMap<Snowflake, User>
    guilds: ExtendoMap<Snowflake, Guild>
    channels: ExtendoMap<Snowflake, Channel>

    user: ClientUser;

    gateway: GateHandler;
    rest: RESTManager;
    monitor: Monitor;

    pings: Array<number>;
    commands: SlashCommandInterface;

    voice: any;

    get ping(): number;
    get uptime(): number;

    start(token?: string): Promise<Client>;

    public on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this;
  }

  export class SlashCommandInterface {
    private client: Client;
    cache: ExtendoMap;

    register(command: object | SlashCommand): SlashCommand;
    bulkRegister(commands: Array<object | SlashCommand>): Array<SlashCommand>
  }

  export class Monitor {

  }

  class RESTManager {
    agent: string;
    client: Client;
    base: string;

    get(url: string): Promise<object>;
    post(url: string, body: object): Promise<object>;
    patch(url: string, body: object): Promise<object>;
    put(url: string, body: object): Promise<object>;
    delete(url: string): Promise<object>;
  }

  class GateHandler {
    statusUpdate(status: string): void;
    presenceUpdate(presence: Presence): void;
  }

  class Snowflake {

  }

  export class User {
    id: string;
    username: string;
    avatarHash: string;
    discriminator: number;
    bot: boolean;

    get avatar(): string;
    send(payload: object | Embed)
  }

  export class Embed {
    title: string;
    description: string;
    fields: Array<object>;
    footer: object;

    parse(): object;
  }

  export class Guild {

  }

  export class Message {
    id: string;
    content: string;
    author: User;

    reply(payload: object|string|Embed): Promise<Message>;
    delete(timeout: number): Promise<void>;
  }

  export class Channel {

  }

  export class TextChannel extends Channel {
    send(payload: object|string|Embed): Promise<Message>;
  }

  export class VoiceChannel extends Channel {

  }

  export class CategoryChannel extends Channel {

  }

  export class ClientUser {
    username: string;
    id: string;
    avatar: string;
    discriminator: string;
    tag: string;
    bot: boolean;
    flags: Array<number>;
    status: string;
    presence: Presence;
    private client: Client;

    avatarURL(options: AvatarURLOptions): string;
    setUsername(username: string): Promise<this>;
    setAvatar(avatar: string | Buffer): Promise<this>;
    statusUpdate(status: string): Promise<any>;
    presenceUpdate(presence: object): Promise<any>;
    edit(payload: object): Promise<ClientUser>;
  }

  export class ExtendoMap
  }

  export interface Presence {

  }

  export interface WebSocketInfo {
    socket: WebSocket,
    sessionId: number,
    ping: number,
    heartbeat: {
      interval: number,
      received: boolean,
      last: number,
      startHeartbeat: Function
    }
  }

  enum DiscordEvent {

  }

  export interface AvatarURLOptions {
    type: string,
    dynamic: boolean,
    size: number,
  }

  interface ClientEvents {
    channelCreate: [VoiceChannel | TextChannel | CategoryChannel | Channel];
    channelDelete: [VoiceChannel | TextChannel | CategoryChannel | Channel];
    channelPinsUpdate: [TextChannel];
    channelUpdate: [VoiceChannel | TextChannel | CategoryChannel | Channel];
    debug: [string];
    warn: [string];
    disconnect: [any, number];
    emojiCreate: [Emoji];
    emojiDelete: [Emoji];
    emojiUpdate: [Emoji];
    error: [DiscordError];
    guildBanAdd: [Guild, User];
    guildBanRemove: [Guild, User];
    guildCreate: [Guild];
    guildRemove: [Guild];
    guildUnavailable: [Guild];
    guildIntegrationsUpdate: [Guild];
    guildMemberAdd: [Guild];
    guildMemberRemove: [Guild];
    guildMembersChunk: [
      ExtendoMap<Snowflake, Member>,
      Guild,
      { count: number, index: number, nonce: string | undefined }
    ];
    guildMemberSpeaking: [GuildMember,Readonly<User>];
    guildMemberUpdate: [GuildMember, GuildMember];
    guildUpdate: [Guild, Guild];
    inviteCreate: [Invite];
    inviteDelete: [Invite];
    messageCreate: [Message];
    messageDelete: [Message];
    messageReactionRemoveAll: [Message];
    messageReactionRemoveEmoji: [Reaction];
    messageDeleteBulk: [ExtendoMap<Snowflake, Message>];
    messageReactionAdd: [Reaction, User];
    messageReactionRemove: [Reaction, User];
    messageReactionRemove: [MessageReaction, User];
    messageUpdate: [Message, Message];
    presenceUpdate: [Presence | null, Presence];
    rateLimit: [RateLimit];
    ready: [],
    invalidated: [],
    roleCreate: [Role];
    roleDelete: [Role];
    roleUpdate: [Role, Role];
    typingStart: [Channel, User];
    userUpdate: [User, User];
    voiceStateUpdate: [VoiceState, VoiceState];
    webhookUpdate: [TextChannel];
    shardDisconnect: [string, number];
    shardError: [Error, number];
    shardReady: [number, Set<Snowflake>|undefined];
    shardReconnecting: [number];
    shardResume: [number, number];
  }
}