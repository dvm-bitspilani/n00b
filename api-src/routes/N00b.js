import n00bController from '../controllers/N00b';

module.exports = function(app) {
  app.route('/core')
    .get(n00bController.list_all_n00bs)
    // .post(n00bController.create_new_n00b)
    // .delete(n00bController.kill_n00b)
    .put(n00bController.build_n00b);

  app.route('/external')
    .post(n00bController.pull_n00b);

  app.route('/github')
    .post(n00bController.webhook);
};
