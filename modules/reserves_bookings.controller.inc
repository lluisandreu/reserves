<?php 

class ReservesBookingsController extends EntityAPIController {

	public function create(array $values = array()) {
		$values += array('is_new' => TRUE);
		$values += array(
			'pax' => '1',
		);

		if (isset($this->entityInfo['entity class']) && $class = $this->entityInfo['entity class']) {
      		return new $class($values, $this->entityType);
    	}
		return (object) $values;
	}
}