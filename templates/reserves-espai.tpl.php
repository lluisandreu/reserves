<p><a href="<?php print url('espais'); ?>">Veure tots els espais</a></p>

<?php $content = $element->content; ?>

<?php print render($content['reserves_espai_images']); ?>
<?php print render($content['reserves_espai_body']); ?>
<?php print render($content['reserves_espai_times']); ?>

<?php if($fullcalendar_exists && $moment_exists): ?>
	<h2>Com fer una reserva?</h2>
	<p>Per fer una reserva nova fes una selecció amb el cursor a sobre del dia i hora que vols reservar. Per fer una reserva en un espai que ja ha estat reservat fes click a sobre de la reserva i selecciona el número de places.</p>
	<div id="reserves-calendar"></div>
<?php endif; ?>

<div id="add-booking-popup" class="add-booking-popup" style="display: none;">
	<h2>Confirma la teva reserva</h2>
	<?php print $add_event_form; ?>
</div>