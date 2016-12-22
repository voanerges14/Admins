export default function loadAuth(req) {
  console.log('loadAuth ' + JSON.stringify(req.user));
  return Promise.resolve(req.user || null);
}

// export default function loadAuth(req) {
//   console.log('loadAuth ' + JSON.stringify(req.session));
//   if ('passport' in req.session) {
//     return Promise.resolve(req.session.passport.user || null);
//   }
//   return Promise.resolve(null);
// }


