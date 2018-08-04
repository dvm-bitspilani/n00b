import n00bController from '../controllers/N00b';

module.exports = function(app) {
  app.route('/n00b/core')
    .get(n00bController.list_all_n00bs)
    // .post(n00bController.create_new_n00b)
    // .delete(n00bController.kill_n00b)
    .put(n00bController.build_n00b);

  app.route('/n00b/external')
    .post(n00bController.pull_n00b);

  app.route('/n00b/github')
    .post(n00bController.webhook);
};
