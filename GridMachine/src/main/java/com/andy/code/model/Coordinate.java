package com.andy.code.model;

public class Coordinate {

	private int rotation;
	
	private int distance;
	
	public Coordinate() {
	}

	/**
	 * @param rotation
	 * @param distance
	 */
	public Coordinate(int rotation, int distance) {
		super();
		this.rotation = rotation;
		this.distance = distance;
	}

	/**
	 * @return the rotation
	 */
	public int getRotation() {
		return rotation;
	}

	/**
	 * @param rotation the rotation to set
	 */
	public void setRotation(int rotation) {
		this.rotation = rotation;
	}

	/**
	 * @return the distance
	 */
	public int getDistance() {
		return distance;
	}

	/**
	 * @param distance the distance to set
	 */
	public void setDistance(int distance) {
		this.distance = distance;
	}
	
	
}
