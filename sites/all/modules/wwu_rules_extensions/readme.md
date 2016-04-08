# WWU Rules Clear Messages #

This module provides a Rules action that clears system messages from the site's message queue. You can specify which messages to clear by specifying the type (status, warning, or error) and/or a regular expression to check agains the message's text.

## Sample Use Cases ##

### Hide error messages from anonymous users ###

Set up a rule on the event "Drupal is initializing", and add a condition "User has role" for the currently logged-in user (site:current-user). Add "Clear system messages" as an action and select the type "error".

### Hide the default confirmation message shown after creating a node ###

Set up a rule on the event "Drupal is initializing". Add "Clear system messages" as an action, select type "All", and enter the regular expression "/.+ .+ has been created\./" (without quotes).

In order to hide confirmation messages only for a specific node type, use the regular expression "/[node-type] .+ has been created\./" (without quotes).

Note that this action will not have the desired effect if fired on a rule with the event "After saving new content" because the system sets the node creation message after the rule has finished firing (i.e. after the message queue has been cleared).

### Replace a default node creation confirmation message with a custom one ###

Create a rule that fires "After saving new content", and add a condition on the type of the new node. Add "Show a message on the site" as an action and enter the custom confirmation message. Then, create a rule to hide the default confirmation message for that content type as described above.
