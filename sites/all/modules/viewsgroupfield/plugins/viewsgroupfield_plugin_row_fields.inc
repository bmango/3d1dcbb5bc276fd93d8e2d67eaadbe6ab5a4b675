<?php
/**
 * @file
 * Contains the semantic row style plugin.
 */

/**
 * The semantic 'fields' row plugin
 *
 * This displays fields one after another, giving options for HTML element and
 * class.
 *
 * @ingroup views_row_plugins
 */
class viewsgroupfield_plugin_row_fields extends views_plugin_row {
  function option_definition() {
    $options = parent::option_definition();

    $options['inline'] = array('default' => array());
    $options['separator'] = array('default' => '');
    $options['hide_empty'] = array('default' => FALSE);
    $options['default_field_elements'] = array('default' => TRUE);
    $options['regions'] = array('default' => array());
    return $options;
  }

  /**
   * Provide a form for setting options.
   */
  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);
    $options = $this->display->handler->get_field_labels();

    if (empty($this->options['inline'])) {
      $this->options['inline'] = array();
    }

    $form['inline'] = array(
      '#type' => 'checkboxes',
      '#title' => t('Inline fields'),
      '#options' => $options,
      '#default_value' => $this->options['inline'],
      '#description' => t('Inline fields will be displayed next to each other rather than one after another.'),
    );

    $form['separator'] = array(
      '#title' => t('Separator'),
      '#type' => 'textfield',
      '#size' => 10,
      '#default_value' => isset($this->options['separator']) ? $this->options['separator'] : '',
      '#description' => t('The separator may be placed between inline fields to keep them from squishing up next to each other. You can use HTML in this field.'),
    );

    $form['hide_empty'] = array(
      '#type' => 'checkbox',
      '#title' => t('Hide empty fields'),
      '#default_value' => $this->options['hide_empty'],
      '#description' => t('Do not display fields, labels or markup for fields that are empty.'),
    );
    
    $form['group_fields'] = array(
      '#type' => 'fieldset',
      '#title' => t('Group Fields'),
      '#description' => 'Grouped fields into sections. The class name of the container is the text entered in the text field. Multiple fields can have the same container.',
    );
    
    foreach ($options as $id => $title) {
      $form['group_fields']['regions'][$id] = array(
        '#type' => 'textfield',
        '#size' => 10,
        '#default_value' => isset($this->options['group_fields']['regions'][$id]) ? $this->options['group_fields']['regions'][$id] : 'content',
        '#title' => check_plain($title),
      );
    }

  }

  /**
   * Perform any necessary changes to the form values prior to storage.
   * There is no need for this function to actually store the data.
   */
  function options_submit(&$form, &$form_state) {
    $form_state['values']['row_options']['inline'] = array_filter($form_state['values']['row_options']['inline']);
  }
}
