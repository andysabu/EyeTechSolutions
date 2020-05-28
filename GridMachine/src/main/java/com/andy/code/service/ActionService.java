package com.andy.code.service;

import com.andy.code.model.Coordinate;

public interface ActionService {
	
	/**
	 * 
	 * @param color
	 * @return
	 */
	abstract Coordinate calculateCoordinate(String color);

}
