<?php
/**
 * @file viewsgroupfield.theme.inc
 */

/**
 * Preprocess theme function to print a single record from a row, with fields grouped
 */
function template_preprocess_viewsgroupfield_view_fields(&$vars) {
  
  // Inherit from views preprocess
  template_preprocess_views_view_fields($vars);
  
  // See if a views field preprocess exists of any
  // base themes. If so call them so we can inherit them as well
  global $base_theme_info;
  
  foreach ($base_theme_info as $key => $base_theme) {
    $base_theme_preprocess = $base_theme->name . '_preprocess_views_view_fields';
    if (function_exists($base_theme_preprocess)) {
      $base_theme_preprocess($vars);  
    }
  }
  
  // Do grouping  
  foreach ($vars['fields'] as $id => $field) {
    $group = $vars['options']['group_fields']['regions'][$id];
    $grouped[$group][$id] = $field;
  }
  
  $vars['grouped'] = $grouped;
}

function viewsgroupfield_preprocess_views_view_list(&$vars) {
  
  // Add a 'grouped' class to the view row
  foreach ($vars['classes'] as $id => $classes_array) {
    $vars['classes'][$id][] = 'grouped';
    $vars['classes_array'][$id] = implode(' ', $vars['classes'][$id]);
  }
  
}

function viewsgroupfield_preprocess_views_view_unformatted(&$vars) {
  
  // Add a 'grouped' class to the view row
  foreach ($vars['classes'] as $id => $classes_array) {
    $vars['classes'][$id][] = 'grouped';
    $vars['classes_array'][$id] = implode(' ', $vars['classes'][$id]);
  }
   
}