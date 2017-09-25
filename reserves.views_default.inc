<?php

/**
 * Implementation of hook_views_default_views().
 */
function reserves_views_default_views() {
	$export = array();

	$view = new view();
	$view->name = 'espais';
	$view->description = '';
	$view->tag = 'default';
	$view->base_table = 'reserves_espai';
	$view->human_name = 'Espais';
	$view->core = 7;
	$view->api_version = '3.0';
	$view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

	/* Display: Master */
	$handler = $view->new_display('default', 'Master', 'default');
	$handler->display->display_options['use_more_always'] = FALSE;
	$handler->display->display_options['access']['type'] = 'none';
	$handler->display->display_options['cache']['type'] = 'none';
	$handler->display->display_options['query']['type'] = 'views_query';
	$handler->display->display_options['exposed_form']['type'] = 'basic';
	$handler->display->display_options['pager']['type'] = 'full';
	$handler->display->display_options['style_plugin'] = 'default';
	$handler->display->display_options['row_plugin'] = 'fields';
	$handler->display->display_options['row_options']['hide_empty'] = TRUE;
	$handler->display->display_options['row_options']['default_field_elements'] = FALSE;
	/* Field: Espai: Espai ID */
	$handler->display->display_options['fields']['sid']['id'] = 'sid';
	$handler->display->display_options['fields']['sid']['table'] = 'reserves_espai';
	$handler->display->display_options['fields']['sid']['field'] = 'sid';
	$handler->display->display_options['fields']['sid']['label'] = '';
	$handler->display->display_options['fields']['sid']['element_label_colon'] = FALSE;
	$handler->display->display_options['fields']['sid']['element_default_classes'] = FALSE;
	/* Field: Espai: Label */
	$handler->display->display_options['fields']['title']['id'] = 'title';
	$handler->display->display_options['fields']['title']['table'] = 'reserves_espai';
	$handler->display->display_options['fields']['title']['field'] = 'title';
	$handler->display->display_options['fields']['title']['label'] = '';
	$handler->display->display_options['fields']['title']['alter']['make_link'] = TRUE;
	$handler->display->display_options['fields']['title']['alter']['path'] = 'espai/[sid]';
	$handler->display->display_options['fields']['title']['element_type'] = 'h2';
	$handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
	/* Field: Espai: Descripció */
	$handler->display->display_options['fields']['reserves_espai_body']['id'] = 'reserves_espai_body';
	$handler->display->display_options['fields']['reserves_espai_body']['table'] = 'field_data_reserves_espai_body';
	$handler->display->display_options['fields']['reserves_espai_body']['field'] = 'reserves_espai_body';
	$handler->display->display_options['fields']['reserves_espai_body']['label'] = '';
	$handler->display->display_options['fields']['reserves_espai_body']['element_label_colon'] = FALSE;
	/* Field: Espai: Places disponibles */
	$handler->display->display_options['fields']['reserves_espai_slots']['id'] = 'reserves_espai_slots';
	$handler->display->display_options['fields']['reserves_espai_slots']['table'] = 'field_data_reserves_espai_slots';
	$handler->display->display_options['fields']['reserves_espai_slots']['field'] = 'reserves_espai_slots';
	$handler->display->display_options['fields']['reserves_espai_slots']['label'] = '';
	$handler->display->display_options['fields']['reserves_espai_slots']['element_label_type'] = 'span';
	$handler->display->display_options['fields']['reserves_espai_slots']['element_label_colon'] = FALSE;
	$handler->display->display_options['fields']['reserves_espai_slots']['settings'] = array(
	  'thousand_separator' => '',
	  'prefix_suffix' => 0,
	);
	/* Sort criterion: Espai: Label */
	$handler->display->display_options['sorts']['title']['id'] = 'title';
	$handler->display->display_options['sorts']['title']['table'] = 'reserves_espai';
	$handler->display->display_options['sorts']['title']['field'] = 'title';
	/* Filter criterion: Espai: Status */
	$handler->display->display_options['filters']['status']['id'] = 'status';
	$handler->display->display_options['filters']['status']['table'] = 'reserves_espai';
	$handler->display->display_options['filters']['status']['field'] = 'status';
	$handler->display->display_options['filters']['status']['value']['value'] = '1';

	$export['espais'] = $view;

	return $export;
}