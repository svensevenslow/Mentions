/* When a new is issue filed the bot provides an @mention to the reposiotry owner in a comment requesting for labels to be added.
 * When labels are added the bot gives an @mention to the user who filed the issue in a comment informing the user that labels have been added.
 */

async function request_to_label (context) {
  const { payload, github } = context
    
  const issueComment = context.issue({ body: `@${context.payload.repository.owner.login} A new issue has been filed please add labels` })
  return context.github.issues.createComment(issueComment)
}

async function notify_labels_added (context) {
  const { payload, github } = context

  const issueComment = context.issue({ body: `@${context.payload.sender.login} Labels have been added to the issue you filed` })
  return context.github.issues.createComment(issueComment)
}

module.exports = (robot) => {
  robot.log('Yay, the app was loaded!')

  robot.on('issues.opened', request_to_label) 
  robot.on('issues.labeled', notify_labels_added)
}

