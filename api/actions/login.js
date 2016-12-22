// export default function login(req) {
//   const user = {
//     name: req.body.name,
//     password: req.body.password
//   };
//   req.session.user = user;
//   return Promise.resolve(user);
// }

import passport from 'passport';

export default function login(req) {
    console.log('req: ' + JSON.stringify(req.body));
    return new Promise((resolve, reject) => {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return reject(err); // will generate a 500 error
            }
            if (!user) {
                console.log('err:' + JSON.stringify(err));
                console.log('user:' + JSON.stringify(user));
                return reject(info.message);
            }
            req.login(user, loginErr => {
                if (loginErr) {
                    return reject(loginErr);
                }
                return resolve(user);
            });
        })(req);
    });
};
