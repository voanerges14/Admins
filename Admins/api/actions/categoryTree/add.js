const initialWidgets = [
  {id: 1, name: 'Red'},
];

export function getWidgets(req) {
  let category = req.session.category;
  if (!category) {
    category = initialWidgets;
    req.session.category = category;
  }
  return category;
}

export default function load(req) {
  return new Promise((resolve, reject) => {
    // make async call to database
      if (Math.random() < 0.33) {
        reject('Widget load fails 33% of the time. You were unlucky.');
      } else {
        resolve(getWidgets(req));
      }
  });
}
