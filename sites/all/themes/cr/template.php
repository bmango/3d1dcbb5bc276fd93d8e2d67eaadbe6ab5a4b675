<?php

/**
 * @file
 * template.php
 */

/**
 * Implements hook_preprocess_html().
 */
function cr_preprocess_html(&$vars) {
  if ($node = menu_get_object()) {
    $node_wrapper = entity_metadata_wrapper('node', $node);

    //If the content type of this node has a field, field_body_classes_select,
    //let's pass the value(s) of the field to the body class in html.tpl.php
    if (isset($node_wrapper->field_body_classes_select)){
      $body_classes = $node_wrapper->field_body_classes_select->value();
      foreach ($body_classes as $body_class) {
	$vars['classes_array'][] = $body_class;
      }
    }


    //If the content type of this node has a field, field_custom_body_classes,
    //let's pass the value(s) of the field to the body class in html.tpl.php
    if (isset($node_wrapper->field_custom_body_classes)){
      $custom_body_classes = $node_wrapper->field_custom_body_classes->value();
      foreach ($custom_body_classes as $custom_body_class) {
	$vars['classes_array'][] = $custom_body_class;
      }
    }
  }
  
  foreach($vars['user']->roles as $role){
    $vars['classes_array'][] = 'role-' . drupal_html_class($role);
  }

}

/**
* theme_menu_link()
*/

function cr_menu_link(array $variables) {
	
	global $user;
	
   if ($variables['element']['#title']=='Edit Job Details') {
		 $nid = db_query('SELECT nid FROM {node} WHERE type = :type and uid = :uid', array(':type' => 'job', ':uid' => $user->uid))->fetchField();
		 //dsm($nid);
		 //dsm($variables['element']);
		 if($nid > 0) {
	      $variables['element']['#href']='job/' . $user->uid . '/' . $nid;
		 } else {
	      $variables['element']['#attributes']['class'][] = 'invisible';
		 }
	 }

//add class for li
   $variables['element']['#attributes']['class'][] = 'menu-' . $variables['element']['#original_link']['mlid'];
//add class for a
   $variables['element']['#localized_options']['attributes']['class'][] = 'menu-' . $variables['element']['#original_link']['mlid'];
//dvm($variables['element']);
  return theme_menu_link($variables);
}


//Change Contact form page title
function cr_form_contact_site_form_alter(&$form, &$form_state) {
  drupal_set_title('Contact Us');
}

function cr_form_alter(&$form, $form_state, $form_id) {
	if ($form_id == 'user_login') {
	  drupal_set_title(t('Log In'));
	}
	if ($form_id == 'user_pass') {
	  drupal_set_title(t('Request New Password'));
	}
	if($form_id == 'profile2_edit_carer_form') {
		//dpm($form);
		//$form['profile_carer']['field_profile_active']['#attributes'] =  array('data-toggle' => array('toggle'));
		//$form['profile_carer']['field_first_name_cr']['#attributes'] =  array('data-toggle' => array('toggle'));
		//['profile_carer']['field_first_name_cr']['#attributes']
		//'#attributes' => array('class' => array('hidden')),
	}
	if($form_id == 'comment_node_message_form') {
	    //unset($form['author']['_author']);
	}
}

function cr_checkbox($variables) {
  $element = $variables ['element'];
  $element ['#attributes']['type'] = 'checkbox';
  element_set_attributes($element, array('id', 'name', '#return_value' => 'value'));
  
  // Unchecked checkbox has #value of integer 0.
  if (!empty($element ['#checked'])) {
    $element ['#attributes']['checked'] = 'checked';
  }
  
  if ($element['#attributes']['id'] == 'edit-profile-carer-field-profile-active-und') {
      $element['#attributes']['data-toggle'] = 'toggle';
		$element['#attributes']['data-on'] = 'Active';
		$element['#attributes']['data-off'] = 'Unactive';
		$element['#attributes']['data-onstyle'] = 'success';
  }
  
  _form_set_class($element, array('form-checkbox'));

  return '<input' . drupal_attributes($element ['#attributes']) . ' />';
}

//remove fieldset from date field in entry form
function cr_date_combo($variables) {
  return theme('form_element', $variables);
}

/**
 * Registers overrides for various functions.
 *
 * In this case, overrides three user functions
 */
function cr_theme() {
  $items = array();
    
  $items['user_login'] = array(
    'render element' => 'form',
    'path' => drupal_get_path('theme', 'cr') . '/templates',
    'template' => 'user-login',
    'preprocess functions' => array(
       'cr_preprocess_user_login'
    ),
  );
  return $items;
}

function cr_preprocess_user_login(&$vars) {
  $vars['forgot_link'] = l(t('Forgot password?'),'user/password');
}

function cr_preprocess_page(&$vars) {
  global $user;
	if(arg(0)=='profile-carer_employer') :
		drupal_set_title(t('My Profile'));
	elseif (arg(0) == 'user' && arg(2) == 'edit') :
		drupal_set_title(t('Change email/password'));
	elseif(arg(0) == 'profile-carer' && in_array('carer employer active', $user->roles)) :
      $variables['theme_hook_suggestion'] = 'page__profile_carer_carer_employer_active';
	// set title to carer name for carer details page
	elseif(arg(0) == 'carer-details' && is_numeric(arg(1))) :
		$profile = profile2_load(arg(1));
		//dsm($profile);
		drupal_set_title(t($profile->field_first_name_em['und'][0]['value'] . ' ' . $profile->field_last_name_em['und'][0]['value']));
	//elseif(arg(0)=='node' && is_numeric(arg(1))) :
	//elseif($vars['node']->type=='message') :
	elseif(arg(0)=='node') :
		if($vars['node']->type=='message') :
			$profile = profile2_by_uid_load($vars['node']->uid, 'carer_employer');
			//dpm($profile);
			//drupal_set_title(t($profile->field_first_name_em['und'][0]['value'] . ' ' . $profile->field_last_name_em['und'][0]['value']));
			$vars['title'] = "Message from " . $profile->field_first_name_em['und'][0]['value'] . ' ' . $profile->field_surname_initial['und'][0]['value'];
		endif;
	endif;
	//dpm($vars['node']);
	//dpm($vars);
}

// Change author label on message node to 'from' instead of author
/*
function cr_preprocess_field(&$vars){
	if($node = menu_get_object()) {
		if($node->type=='message') {
			if($vars['element']['#field_name']=='author') {
				$vars['label'] = 'From';
			}
		}
	}
}
*/

/**
 * Implements hook_profile2_view_alter()
 *
 * Overrides the default title of the Profile2 page using profile fields.
 * Where no profile exists, do nothing i.e. use Profile2's default label.
 *
 */
function cr_profile2_view_alter($build) {
  // If Devel is enabled, you may uncomment dpm() to find out how
  // you can access the various fields of your profile.
   //dpm($build);
 // if (!isset($build['empty'])) {
	if($build['#view_mode'] == 'carer_details_employer') {
    $custom_title =  $build['field_first_name_em'][0]['#markup'];
    $custom_title .= ' ' . $build['field_last_name_em'][0]['#markup'];
    //drupal_set_title('<i class="fa fa-user"></i> ' . $custom_title);
	 drupal_set_title($custom_title);
  }
}

/**
 * Overrides theme_menu_local_tasks().
 */
function cr_menu_local_tasks(&$variables) {
  $output = '';

  if (!empty($variables['primary'])) {
    $variables['primary']['#prefix'] = '<h2 class="element-invisible">' . t('Primary tabs') . '</h2>';
//    $variables['primary']['#prefix'] .= '<ul class="tabs--primary nav nav-tabs">';
    $variables['primary']['#prefix'] .= '<ul class="tabs--primary nav nav-pills">';
    $variables['primary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['primary']);
  }

  if (!empty($variables['secondary'])) {
    $variables['secondary']['#prefix'] = '<h2 class="element-invisible">' . t('Secondary tabs') . '</h2>';
    $variables['secondary']['#prefix'] .= '<ul class="tabs--secondary pagination pagination-sm">';
    $variables['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['secondary']);
  }

  return $output;
}