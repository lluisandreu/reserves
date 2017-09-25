<?php 
/*
* Plantilla per a la pàgina d'una reserva. Si es vol personalitzar és millor 
* que creeu el mateix fitxer reserves-booking.tpl.php a la carpeta de plantilles del vostre tema i el carregueu 
* amb un hook_theme_alter().
*/
?>

<?php $theuser = user_load($element->uid); ?>
<?php $espai_title = get_espai_name_by_id($element->sid); ?>
<?php $content = $element->content; ?>

<p><a href="<?php print url('user/' . $element->uid . '/reserves'); ?>">Torna a les meves reserves</a></p>

<div class="booking-entity booking-<?php print $element->bid; ?>">
	<p><strong>Usuari: </strong><?php print l($theuser->name, 'user/' . $element->uid); ?></p>
	<p><strong>Espai resevat: </strong><?php print l($espai_title, 'espai/' . $element->sid); ?></p>
	<p><strong>Dia de la reserva: </strong><?php print format_date(strtotime($element->reserves_booking_bookingtime['und'][0]['value']), 'custom', 'd/m/Y'); ?></p>
	<p><strong>Hores reservades:</strong> de <?php print format_date(strtotime($element->reserves_booking_bookingtime['und'][0]['value']), 'custom', 'H:i'); ?> a <?php print format_date(strtotime($element->reserves_booking_bookingtime['und'][0]['value2']), 'custom', 'H:i'); ?></strong></p>
	<p><strong>Places: </strong><?php print $element->pax; ?></p>
	<p><strong>Estat: </strong><?php print booking_format_status($element->status); ?></p>
	<p><strong>Data de creació: </strong><?php print format_date($element->created, 'custom', 'd/m/y - H:i'); ?></p>
</div>
