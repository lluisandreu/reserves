<?php 

class ReservesEspaisController extends EntityAPIController {

	public function create(array $values = array()) {
		$values += array('is_new' => TRUE);
		$values += array(
			'title' => '',
		);

		if (isset($this->entityInfo['entity class']) && $class = $this->entityInfo['entity class']) {
      		return new $class($values, $this->entityType);
    	}
		return (object) $values;
	}
	
}