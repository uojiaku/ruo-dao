import { Principal, $query, Record, StableBTreeMap, Opt, $update, Vec } from 'azle';

// actor {
//     public shared (msg) func whoami() : async Principal {
//         msg.caller
//     };
// };

type User = Record <{
    email: string;
    password: string;
    state: string;
    country: string;
    zip: number;
}>;


$query
export let Users = new StableBTreeMap<Principal, User>(0, 100, 1_000);

// check if key exists
$query;
export function containsMyKey(Principal: Principal): boolean {
    return Users.containsKey(Principal);
}

// retrieve principal by key
$query;
export function getMyPrincipal(Principal: Principal): Opt<User> {
    return Users.get(Principal);
}

// insert principal
$update;
export function insertMyPrincipal(key: Principal, value: User): Opt<User> {
    return Users.insert(key, value);
}

// get all users
$query;
export function getAllUsers(): Vec<User> {
    return Users.values();
}

// get all principals
$query;
export function getAllPrincipals(): Vec<Principal> {
    return Users.keys()
}

// if key exists, retrieve otherwise insert.
// $update;
// export function createEntry(Principal: Principal): Opt<User> {
//     if (Users.containsKey(Principal)) {
//         console.log("the User already exists ${Principal} !");
//         return Users.get(Principal);
//     } else {
//         Users.insert(Principal, User);
//     }
// }


// $update;
// export function insertAgin(key: Principal, value: User): Opt<User> {
//     return Users.insert(key, value);
// }