export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'containsKey' : IDL.Func([IDL.Nat8], [IDL.Bool], ['query']),
    'getPrincipal' : IDL.Func([IDL.Nat8], [IDL.Opt(IDL.Principal)], ['query']),
    'insert' : IDL.Func(
        [IDL.Nat8, IDL.Principal],
        [IDL.Opt(IDL.Principal)],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
