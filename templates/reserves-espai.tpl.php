<?php $content = $element->content; ?>
<?php dpm($element); ?>

<?php print render($content['reserves_espai_body']); ?>

<?php print render($content['reserves_espai_times']); ?>

<?php if($fullcalendar_exists && $moment_exists): ?>
	<h2>Fes una reserva</h2>
	<div id="reserves-calendar"></div>
<?php endif; ?>

<?php reserves_validate_booking_dates("00-00-00", "00-00-00", $element->sid); ?>

<div id="add-booking-popup" class="add-booking-popup" style="display: none;">
	<h2>Confirma la teva reserva</h2>
	<div id="ajax-status-messages-wrapper"></div>
	<?php print $add_event_form; ?>

</div>