import { Principal, $query, Record, StableBTreeMap, nat8, Opt, $update } from 'azle';

// actor {
//     public shared (msg) func whoami() : async Principal {
//         msg.caller
//     };
// };

type User = Record <{
    id: Principal;
    username: string;
}>;



let Users = new StableBTreeMap<nat8, Principal>(0, 100, 1_000);

// check if key exists
$query;
export function containsKey(nat8: nat8): boolean {
    return Users.containsKey(nat8);
}

// retrieve principal by key
$query;
export function getPrincipal(nat8: nat8): Opt<Principal> {
    return Users.get(nat8);
}

// insert principal
$update;
export function insert(key: nat8, value: Principal): Opt<Principal> {
    return Users.insert(key, value);
}