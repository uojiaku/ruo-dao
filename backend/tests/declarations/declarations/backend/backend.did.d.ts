import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'containsKey' : ActorMethod<[number], boolean>,
  'getPrincipal' : ActorMethod<[number], [] | [Principal]>,
  'insert' : ActorMethod<[number, Principal], [] | [Principal]>,
}
