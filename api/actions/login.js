export default function login(req) {
  const user = {
    name: req.body.name,
    password: req.body.password
  };
  req.session.user = user;
  return Promise.resolve(user);
}
