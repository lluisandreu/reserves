<p><a href="<?php print url('espais'); ?>">Veure tots els espais</a></p>
<?php global $user; ?>
<?php $content = $element->content; ?>

<?php print render($content['reserves_espai_images']); ?>
<?php print render($content['reserves_espai_body']); ?>
<?php print render($content['reserves_espai_times']); ?>

<?php if (user_access("create bookings", $user)): ?>
<?php if($fullcalendar_exists && $moment_exists): ?>
	<h2>Com fer una reserva?</h2>
	<p>Per fer una reserva nova selecciona una franja horaria del dia que vols fer la reserva. Si vols reservar un espai que ja ha estat reservat a la mateixa hora fes click a sobre de la reserva i selecciona el número de places.</p>
	<div id="reserves-calendar"></div>
<?php endif; ?>

<div id="add-booking-popup" class="add-booking-popup" style="display: none;">
	<h2>Confirma la teva reserva</h2>
	<?php print $add_event_form; ?>
</div>
<?php else: ?>
	<p>No tens permisos per fer reserves.</p>
<?php endif; ?>