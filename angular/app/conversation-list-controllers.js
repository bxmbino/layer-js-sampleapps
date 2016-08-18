/* global angular layer */
'use strict';

var controllers = angular.module('conversationListControllers', []);

/**
 * The Conversation List Controller manages the List of Conversation on
 * the left column.
 *
 * This Controller manages the Conversation Query which delivers
 * all Conversations and any changes to the Conversations.
 */
controllers.controller('conversationListCtrl', function ($scope, $rootScope) {

  // Create the Conversation List query
  $scope.query = $scope.appCtrlState.client.createQuery({
    model: layer.Query.Conversation,
    dataType: 'object',
    paginationWindow: 50
  });

  /**
   * Any time the query data changes, rerender.  Data changes when:
   *
   * * The Conversation data has loaded from the server
   * * A new Conversation is created and added to the results
   * * A Conversation is deleted and removed from the results
   * * Any Conversation in the results has a change of metadata or participants
   */
  $scope.query.on('change', function() {
    $rootScope.$digest();
  });
});