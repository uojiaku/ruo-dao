import { Actor, HttpAgent } from '@dfinity/agent';
import {
  AuthClient,
  AuthClientLoginOptions,
  ERROR_USER_INTERRUPT,
} from '@dfinity/auth-client';
import useObservableState from '../hooks/utils/useObservableState';
import { applicationName } from '../setupApp';
import { handleError } from '../utils/handlers';
import makeObservable from '../utils/makeObservable';
import { getBackend, isLocalNetwork } from './backendService';
import { unwrap } from '../utils/unwrap';
import { backend } from '../declarations/backend';



export const USER_Principal =  backend.getPrincipal(0);

const localIdentityProvider = isLocalNetwork ? `http://localhost:4943?canisterId=${process.env.INTERNET_IDENTITY_CANISTER_ID}` : 'https://identity.ic0.app/';
const identityProviderUrl = isLocalNetwork ?
        `http://127.0.0.1:4943/?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}` :
        'https://identity.ic0.app/';

const clientPromise = window.indexedDB
  ? AuthClient.create()
  : Promise.resolve(undefined);

const loginIC = async (
  options?: Omit<Omit<AuthClientLoginOptions, 'onSuccess'>, 'onError'>,
) => {
  const client = await clientPromise;
  if (client) {
    try {
      await new Promise((onSuccess: any, onError) =>
        client.login({
          maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
          ...(options || {}),
          onSuccess: async () => {},
          onError,

        }),
      );
    } catch (err) {
      if (err === ERROR_USER_INTERRUPT) {
        return;
      }
      throw err;
    }
    await finishLoginIC(client);
  }
  return client;
};

const finishLoginIC = async (client: AuthClient) => {
  const agent = Actor.agentOf(getBackend()) as HttpAgent;
  agent.replaceIdentity(client.getIdentity());


const identity = await client.getIdentity();
const principal = identity.getPrincipal().toString();


const fetchUser = async () => {
  try {
  const User_store = backend.getMyPrincipal(principal);
  } catch (err) {
    console.error(err);
  }
} else {

  // const detail = await loadUserDetail();
  // console.log('User:', detail);
  User_store.insert();
  }
};

// const loadUserDetail = async (): Promise<UserDetail> => {
//   try {
//     let detail = unwrap(await getBackend().fastLogin());
//     if (!detail) {
//       detail = await getBackend().login();
//     }
//     return {
//       createTime: new Date(Number(detail.createTime) / 1e6),
//     };
//   } catch (err) {
//     console.warn(err);
//     return {
//       createTime: undefined,
//     };
//   }
// };

if (window.indexedDB) {
  (async () => {
    try {
      const client = await clientPromise;
      if (client && (await client.isAuthenticated())) {
        await finishLoginIC(client);
      } else {
        User_store.insertMyPrincipal(null);
      }
    } catch (err) {
      handleError(err, 'Error while fetching user info!');
      window.indexedDB.deleteDatabase('auth-client-db'); // Clear login cache
      USER_STORE.set(null);
      return;
    }
  })();
} else {
  USER_STORE.set(null);
}

export async function loginInternetIdentity() {
  return loginIC({
    identityProvider: isLocalNetwork() ? localIdentityProvider : undefined,
  });
}

function getNetwork(): string | undefined {
  return import.meta.env.DFX_NETWORK;
}


export async function logout() {
  const user = USER_STORE.get();
  if (user?.type === 'ic') {
    await user.client.logout();
  }
  USER_STORE.set(null);
}

// export async function refreshUser() {
//   const user = USER_STORE.get();
//   if (!user) {
//     return;
//   }
//   USER_STORE.set({
//     ...user,
//     detail: await loadUserDetail(),
//   });
// }

export default function useIdentity(): User | null | undefined {
  return useObservableState(USER_STORE)[0];
}
