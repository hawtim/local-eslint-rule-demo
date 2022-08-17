module.exports = {
  meta: {
    messages: {
      emptyCatch: 'Empty catch block is not allowed.',
    },
  },
  create(context) {
    return {
      CatchClause(node) {
        if (node.body.body.length === 0) {
          context.report({ node: node.body, messageId: 'emptyCatch' });
        }
      },
      // or
      // TryStatement(node) {
      //   if (node.handler && node.handler.body.body.length === 0) {
      //     context.report({ node: node.handler.body, messageId: 'emptyCatch' });
      //   }
      // }
    }
  }
}