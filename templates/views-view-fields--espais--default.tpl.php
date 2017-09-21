<?php print render($fields['title']->content); ?>
<p><strong>Capacitat: </strong><?php print render($fields['reserves_espai_slots']->content); ?> places</p>
<?php print render($fields['reserves_espai_body']->content); ?>
<p><a href="<?php print url('espai/' . $fields['sid']->content); ?>">Fes una reserva ara</a></p>
<hr>