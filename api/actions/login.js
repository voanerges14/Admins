export default function login(req) {
  const user = {
    email: req.body.email,
    password: req.body.password
  };
  req.session.user = user;
  return Promise.resolve(user);
}

// import passport from 'passport';
//
// export default function login(req) {
//   console.log('req: ' + JSON.stringify(req.body));
//   return new Promise((resolve, reject) => {
//     passport.authenticate('local', function(err, user, info) {
//       console.log('user:' + JSON.stringify(user));
//       if (err) {
//         return reject(err); // will generate a 500 error
//       }
//       if (!user) {
//         console.log('err:' + JSON.stringify(err));
//         return reject({ message: info.message, status: 406 });
//       }
//       req.login(user, loginErr => {
//         console.log('loginErr:' + JSON.stringify(loginErr));
//         if (loginErr) {
//           return reject(loginErr);
//         }
//         return resolve(user);
//       });
//     })(req);
//   });
// };
