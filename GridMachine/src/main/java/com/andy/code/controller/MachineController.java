package com.andy.code.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.andy.code.model.Cell;
import com.andy.code.model.Coordinate;
import com.andy.code.service.ActionService;

@Controller
@RequestMapping("machine")
@CrossOrigin(origins = "*")
public class MachineController {

	private static final Log LOGGER = LogFactory.getLog(MachineController.class);

	@Autowired
	@Qualifier("actionService")
	private ActionService actionService;

	@GetMapping("grid")
	public String getGrid() {
		return "grid";
	}

	@PutMapping("update")
	public ResponseEntity<Coordinate> update(@RequestBody Cell cell) {
		LOGGER.info("Hello from controller!");

		Coordinate coordinate = actionService.calculateCoordinate(cell.getColor());
		return ResponseEntity.ok(coordinate);
	}
}
