package com.andy.code.model;

public class Cell {

	private int x;
	
	private int y;
	
	private String color;
	
	public Cell() {
	}

	/**
	 * @param x
	 * @param y
	 * @param color
	 */
	public Cell(int x, int y, String color) {
		super();
		this.x = x;
		this.y = y;
		this.color = color;
	}

	/**
	 * @return the x
	 */
	public int getX() {
		return x;
	}

	/**
	 * @param x the x to set
	 */
	public void setX(int x) {
		this.x = x;
	}

	/**
	 * @return the y
	 */
	public int getY() {
		return y;
	}

	/**
	 * @param y the y to set
	 */
	public void setY(int y) {
		this.y = y;
	}

	/**
	 * @return the color
	 */
	public String getColor() {
		return color;
	}

	/**
	 * @param color the color to set
	 */
	public void setColor(String color) {
		this.color = color;
	}
	
	
}
