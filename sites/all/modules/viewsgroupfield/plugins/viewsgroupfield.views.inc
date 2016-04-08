<?php
/**
 * @file viewsgroupfield.views.inc
 */

/**
 * Implementation of hook_views_plugins().
 */
function viewsgroupfield_views_plugins() {
  return array(
    'row' => array(
      'viewsgroupfield_fields' => array(
        'title' => t('Group Fields'),
        'help' => t('Group Fields into user defined regions.'),
        'handler' => 'viewsgroupfield_plugin_row_fields',
        //'path' => drupal_get_path('module', 'viewsgroupfield') . '/plugins',
        'theme' => 'viewsgroupfield_view_fields',
        'theme file' => 'viewsgroupfield.theme.inc',
        'theme path' => drupal_get_path('module', 'viewsgroupfield') . '/theme',
        'uses fields' => TRUE,
        'uses options' => TRUE,
        'type' => 'normal',
        'help topic' => 'style-row-fields',
      ),
    ),
  );
}
