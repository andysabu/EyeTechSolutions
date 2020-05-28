package com.andy.code.service;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.andy.code.model.Coordinate;

@Service("actionService")
public class ActionServiceImpl implements ActionService {

	private static final Log LOGGER = LogFactory.getLog(ActionServiceImpl.class);

	@Override
	public Coordinate calculateCoordinate(String color) {
		LOGGER.info("Hello from service");
		LOGGER.info("Color:" + color);
		Coordinate coordinate = new Coordinate(0, 0);
		switch (color) {
			case "white":
				coordinate.setRotation(90);
				coordinate.setDistance(1);
				break;
			case "black":
				coordinate.setRotation(-90);
				coordinate.setDistance(1);
				break;
		}

		return coordinate;
	}

}
